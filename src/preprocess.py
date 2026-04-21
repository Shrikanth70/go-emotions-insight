import re
import pandas as pd
from src.utils import EMOTION_LABELS

def clean_text(text):
    """
    Perform basic text cleaning for NLP.
    - Convert to lowercase
    - Remove extra whitespace
    """
    if not isinstance(text, str):
        return ""
    text = text.lower().strip()
    # Simple regex for basic cleaning if needed
    # text = re.sub(r'\s+', ' ', text)
    return text

def preprocess_dataframe(df, text_column='text'):
    """
    Clean text and prepare the dataframe.
    """
    df_clean = df.copy()
    df_clean['clean_text'] = df_clean[text_column].apply(clean_text)
    
    # Ensure labels are binary (0, 1)
    # The raw GoEmotions dataset might have multi-label flags already
    # but we ensure the columns exist and are numeric.
    for label in EMOTION_LABELS:
        if label not in df_clean.columns:
            df_clean[label] = 0
            
    return df_clean

def split_data(df, target_cols=EMOTION_LABELS, test_size=0.15, random_state=42):
    """
    Split data into training and testing sets.
    """
    from sklearn.model_selection import train_test_split
    
    X = df['clean_text']
    y = df[target_cols]
    
    return train_test_split(X, y, test_size=test_size, random_state=random_state)
