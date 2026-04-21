import os
import joblib
import torch
import numpy as np
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from src.utils import SAVED_MODELS_DIR, EMOTION_LABELS

class GoEmotionsPredictor:
    def __init__(self, model_type="baseline", threshold=0.5):
        self.model_type = model_type
        self.threshold = threshold
        self.model = None
        self.vectorizer = None
        self.tokenizer = None
        
        if model_type == "baseline":
            self._load_baseline()
        elif model_type == "transformer":
            self._load_transformer()

    def _load_baseline(self):
        path = SAVED_MODELS_DIR / "baseline_logreg"
        if not path.exists():
             raise FileNotFoundError(f"Baseline model not found at {path}")
        self.model = joblib.load(path / "model.joblib")
        self.vectorizer = joblib.load(path / "vectorizer.joblib")

    def _load_transformer(self):
        path = SAVED_MODELS_DIR / "fine_tuned_distilbert"
        if not path.exists():
             raise FileNotFoundError(f"Transformer model not found at {path}")
        self.model = DistilBertForSequenceClassification.from_pretrained(path)
        self.tokenizer = DistilBertTokenizer.from_pretrained(path)
        self.model.eval()

    def predict(self, texts):
        if self.model_type == "baseline":
            if isinstance(texts, str):
                texts = [texts]
            X_vec = self.vectorizer.transform(texts)
            return self.model.predict(X_vec)
        
        elif self.model_type == "transformer":
            if isinstance(texts, str):
                texts = [texts]
            inputs = self.tokenizer(
                texts, 
                return_tensors="pt", 
                padding=True, 
                truncation=True, 
                max_length=128
            )
            with torch.no_grad():
                logits = self.model(**inputs).logits
            probs = torch.sigmoid(logits).cpu().numpy()
            return (probs >= self.threshold).astype(int)

    def predict_with_scores(self, text):
        """
        Return labels and their associated scores.
        """
        if self.model_type == "baseline":
            X_vec = self.vectorizer.transform([text])
            # OneVsRest LogisticRegression supports predict_proba
            scores = self.model.predict_proba(X_vec)[0]
            results = {EMOTION_LABELS[i]: float(scores[i]) for i in range(len(EMOTION_LABELS))}
        
        elif self.model_type == "transformer":
            inputs = self.tokenizer(
                [text], 
                return_tensors="pt", 
                padding=True, 
                truncation=True, 
                max_length=128
            )
            with torch.no_grad():
                logits = self.model(**inputs).logits
            scores = torch.sigmoid(logits).cpu().numpy()[0]
            results = {EMOTION_LABELS[i]: float(scores[i]) for i in range(len(EMOTION_LABELS))}
            
        return results
