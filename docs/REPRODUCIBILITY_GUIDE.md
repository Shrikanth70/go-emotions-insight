# Reproducibility Guide: Running GoEmotions Insight

To ensure that results are consistent across different environments, follow these steps exactly.

## 1. Environment Setup

### Prerequisites
- Python 3.8+
- pip or conda
- (Optional) CUDA-capable GPU for Transformer training

### Installation
1. Clone the repository.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## 2. Directory Structure Verification
Run the utility script to ensure all necessary folders are in place:
```bash
python -m src.utils
```

## 3. Data Acquisition
Download the GoEmotions dataset:
```bash
python -m src.data_loader
```
The raw `goemotions_*.csv` files will be placed in `data/raw/`.

## 4. Running the Research Notebook
The most complete way to reproduce the research is through the Jupyter notebook:
1. Launch Jupyter: `jupyter notebook`
2. Open `notebooks/01_goemotions_research_notebook.ipynb`.
3. Select "Run All Cells."

## 5. Training the Models (CLI)
You can also run training scripts directly from the source code:
- **Baseline**: Implementation is handled within the notebook.
- **Transformer**: You can use the modular `train_transformer` function in `src/train.py`.

## 6. Verification of Results
After execution, verify the following artifacts:
- **Models**: Look for `model.joblib` and tokenizer files in `models/saved_models/`.
- **Figures**: Check `outputs/figures/` for the distribution and comparison plots.
- **Metrics**: Check `outputs/metrics/` for JSON files containing F1 scores.

## 7. Troubleshooting
- **Memory Errors**: If training DistilBERT fails, decrease the `per_device_train_batch_size` in `src/train.py`.
- **Missing Paths**: Ensure you are running commands from the project root directory.
