import os
import requests
import pandas as pd
from pathlib import Path
from src.utils import RAW_DATA_DIR

URLS = [
    "https://storage.googleapis.com/gresearch/goemotions/data/full_dataset/goemotions_1.csv",
    "https://storage.googleapis.com/gresearch/goemotions/data/full_dataset/goemotions_2.csv",
    "https://storage.googleapis.com/gresearch/goemotions/data/full_dataset/goemotions_3.csv"
]

def download_dataset():
    """Download the GoEmotions dataset if not present."""
    RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    for url in URLS:
        filename = url.split('/')[-1]
        target_path = RAW_DATA_DIR / filename
        if not target_path.exists():
            print(f"Downloading {filename}...")
            response = requests.get(url, stream=True)
            if response.status_code == 200:
                with open(target_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                print(f"Successfully downloaded {filename}")
            else:
                print(f"Failed to download {filename}. Status: {response.status_code}")
        else:
            print(f"{filename} already exists. Skipping download.")

def load_raw_data():
    """Load and concatenate the raw CSV files."""
    files = list(RAW_DATA_DIR.glob("goemotions_*.csv"))
    if not files:
        print("No data files found. Downloading...")
        download_dataset()
        files = list(RAW_DATA_DIR.glob("goemotions_*.csv"))
    
    all_dfs = [pd.read_csv(f) for f in files]
    df = pd.concat(all_dfs, ignore_index=True)
    return df

if __name__ == "__main__":
    df = load_raw_data()
    print(f"Loaded {len(df)} rows from GoEmotions dataset.")
