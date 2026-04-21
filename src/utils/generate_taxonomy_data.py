import pandas as pd
import numpy as np
import json
from pathlib import Path
import sys
import os

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from src.utils import RAW_DATA_DIR, PROCESSED_DATA_DIR, EMOTION_LABELS

def generate_co_occurrence_matrix():
    print("Generating co-occurrence matrix from raw data...")
    
    # List of files
    files = [RAW_DATA_DIR / f"goemotions_{i}.csv" for i in range(1, 4)]
    
    dfs = []
    for f in files:
        if f.exists():
            print(f"Reading {f.name}...")
            dfs.append(pd.read_csv(f))
        else:
            print(f"Warning: {f} not found.")
            
    if not dfs:
        print("Error: No data files found.")
        return
        
    df = pd.concat(dfs, ignore_index=True)
    
    # Extract labels
    label_df = df[EMOTION_LABELS]
    
    # Calculate counts
    counts = label_df.sum().to_dict()
    
    # Calculate co-occurrence (Dot product of matrix with its transpose)
    # This results in a matrix where M[i][j] is the number of times label i and j appear together
    matrix = label_df.T.dot(label_df)
    
    # Convert to list of lists for JSON
    matrix_list = matrix.values.tolist()
    
    output = {
        "labels": EMOTION_LABELS,
        "counts": counts,
        "matrix": matrix_list
    }
    
    # Ensure processed dir exists
    PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    output_path = PROCESSED_DATA_DIR / "taxonomy_matrix.json"
    with open(output_path, 'w') as f:
        json.dump(output, f, indent=2)
        
    print(f"Successfully generated matrix at {output_path}")

if __name__ == "__main__":
    generate_co_occurrence_matrix()
