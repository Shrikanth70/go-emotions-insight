import os
import torch
from pathlib import Path
from typing import List, Union
from src.predict import GoEmotionsPredictor
from src.utils import SAVED_MODELS_DIR

class PredictionService:
    def __init__(self):
        self.baseline_predictor = None
        self.transformer_predictor = None
        self._load_predictors()

    def _load_predictors(self):
        """
        Load available research models.
        """
        # Baseline
        if (SAVED_MODELS_DIR / "baseline_logreg").exists():
            print("Loading research baseline (Logistic Regression)...")
            self.baseline_predictor = GoEmotionsPredictor(model_type="baseline")
        
        # Transformer
        if (SAVED_MODELS_DIR / "fine_tuned_roberta").exists():
            print("Loading SOTA Transformer (RoBERTa)...")
            self.transformer_predictor = GoEmotionsPredictor(model_type="transformer")
        else:
            print("Warning: Fine-tuned transformer not found. Batch processing might be limited.")

    def predict(self, text: Union[str, List[str]], threshold: float = 0.5, use_transformer: bool = True):
        """
        Research-grade prediction service.
        Automatically falls back to baseline if transformer is unavailable.
        """
        predictor = self.transformer_predictor if (use_transformer and self.transformer_predictor) else self.baseline_predictor
        
        if predictor is None:
            raise Exception("No models loaded. Please run the training pipeline first.")

        is_single = isinstance(text, str)
        texts = [text] if is_single else text
        
        results = []
        for t in texts:
            all_scores = predictor.predict_with_scores(t)
            # Sort scores
            sorted_scores = sorted(
                [{"label": k, "score": v} for k, v in all_scores.items()],
                key=lambda x: x["score"],
                reverse=True
            )
            
            top_emotions = [p["label"] for p in sorted_scores if p["score"] >= threshold]
            
            if not top_emotions:
                top_emotions = [sorted_scores[0]["label"]] # Take highest if none cross threshold
                
            results.append({
                "input_text": t,
                "predicted_emotions": sorted_scores,
                "top_emotions": top_emotions,
                "primary_emotion": top_emotions[0]
            })

        return results[0] if is_single else results

# Singleton instance
prediction_service = PredictionService()
