import os
import joblib
import torch
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression
from transformers import (
    RobertaTokenizer, 
    RobertaForSequenceClassification, 
    Trainer, 
    TrainingArguments
)
from torch.utils.data import Dataset
from src.utils import SAVED_MODELS_DIR, EMOTION_LABELS

# --- Baseline Training ---

def train_baseline(X_train, y_train, max_features=10000):
    """
    Train a OneVsRest Logistic Regression baseline.
    """
    vectorizer = TfidfVectorizer(max_features=max_features, ngram_range=(1, 2))
    X_train_vec = vectorizer.fit_transform(X_train)
    
    model = OneVsRestClassifier(LogisticRegression(max_iter=1000, C=10.0))
    model.fit(X_train_vec, y_train)
    
    return model, vectorizer

# --- Transformer Training ---

class GoEmotionsDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len=128):
        self.texts = list(texts)
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = str(self.texts[idx])
        label = self.labels[idx]
        
        encoding = self.tokenizer(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )

        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.FloatTensor(label)
        }

def train_transformer(X_train, y_train, X_val=None, y_val=None, model_name='roberta-base', epochs=1):
    """
    Fine-tune a RoBERTa model.
    """
    tokenizer = RobertaTokenizer.from_pretrained(model_name)
    model = RobertaForSequenceClassification.from_pretrained(
        model_name, 
        num_labels=len(EMOTION_LABELS), 
        problem_type="multi_label_classification"
    )

    train_dataset = GoEmotionsDataset(X_train, y_train, tokenizer)
    eval_dataset = GoEmotionsDataset(X_val, y_val, tokenizer) if X_val is not None else None

    output_dir = SAVED_MODELS_DIR / "fine_tuned_roberta"
    
    training_args = TrainingArguments(
        output_dir=str(output_dir),
        num_train_epochs=epochs,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=16,
        warmup_steps=100,
        weight_decay=0.01,
        logging_dir='./logs',
        logging_steps=50,
        evaluation_strategy="epoch" if eval_dataset else "no",
        save_strategy="epoch",
        load_best_model_at_end=True if eval_dataset else False,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
    )

    trainer.train()
    return model, tokenizer

# --- Persistence ---

def save_baseline(model, vectorizer, name="baseline_logreg"):
    """Save baseline artifacts."""
    path = SAVED_MODELS_DIR / name
    path.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, path / "model.joblib")
    joblib.dump(vectorizer, path / "vectorizer.joblib")
    print(f"Baseline saved to {path}")

def save_transformer(model, tokenizer, name="fine_tuned_roberta"):
    """Save transformer artifacts."""
    path = SAVED_MODELS_DIR / name
    path.mkdir(parents=True, exist_ok=True)
    model.save_pretrained(path)
    tokenizer.save_pretrained(path)
    print(f"Transformer saved to {path}")
