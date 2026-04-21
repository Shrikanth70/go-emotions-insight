from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import pandas as pd
import io

# Relative imports for the app package
from .schemas.prediction import PredictionInput, BatchPredictionInput, PredictionOutput, HealthResponse
from .services.prediction_service import prediction_service

app = FastAPI(
    title="GoEmotions Insight API",
    description="Research-grade Backend API for emotion classification.",
    version="1.2.0"
)

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=HealthResponse)
async def health_check():
    """Check if the API is up and return model details."""
    return {
        "status": "healthy",
        "model_loaded": (prediction_service.baseline_predictor is not None or 
                        prediction_service.transformer_predictor is not None),
        "device": "cuda" if torch.cuda.is_available() else "cpu"
    }

@app.post("/predict", response_model=PredictionOutput)
async def predict_emotion(input_data: PredictionInput):
    """Classify the emotion of a single text string."""
    if not input_data.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    
    try:
        result = prediction_service.predict(input_data.text, threshold=input_data.threshold)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/batch", response_model=List[PredictionOutput])
async def predict_emotions_batch(input_data: BatchPredictionInput):
    """Classify multiple texts in a single optimized batch."""
    if not input_data.texts:
        raise HTTPException(status_code=400, detail="Text list cannot be empty.")
    
    try:
        results = prediction_service.predict(input_data.texts, threshold=input_data.threshold)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/csv")
async def predict_csv(file: UploadFile = File(...)):
    """Upload a CSV file and get predictions for all rows."""
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported.")
    
    try:
        content = await file.read()
        df = pd.read_csv(io.BytesIO(content))
        
        # Look for a text column
        text_col = None
        possible_cols = ['text', 'message', 'content', 'input', 'sentence']
        for col in df.columns:
            if col.lower() in possible_cols:
                text_col = col
                break
        
        if text_col is None:
            text_col = df.columns[0]
            
        texts = df[text_col].astype(str).tolist()
        results = prediction_service.predict(texts)
        
        return {
            "total_rows": len(results),
            "predictions": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ensure Torch is available for health check
import torch

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.app.main:app", host="0.0.0.0", port=8000, reload=True)
