from pydantic import BaseModel
from typing import List, Dict, Optional

class PredictionInput(BaseModel):
    text: str
    threshold: Optional[float] = 0.5

class BatchPredictionInput(BaseModel):
    texts: List[str]
    threshold: Optional[float] = 0.5

class EmotionScore(BaseModel):
    label: str
    score: float

class PredictionOutput(BaseModel):
    input_text: str
    predicted_emotions: List[EmotionScore]
    top_emotions: List[str]
    primary_emotion: str

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    device: str
