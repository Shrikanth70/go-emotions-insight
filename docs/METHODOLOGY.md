# Methodology: End-to-End Emotion Analysis Pipeline

## 1. Data Pipeline
Our research follows a systematic data engineering workflow:
- **Ingestion**: Automated scripts download the GoEmotions CSV fragments and unify them into a single pandas DataFrame.
- **Preprocessing**: 
    - Text normalization: Lowercasing and whitespace stripping.
    - Filtering: Removal of empty or malformed comments.
- **Splitting**: Stratified 85/15 train-test split to maintain class distribution proportions across sets.

## 2. Modeling Strategy
We employ an "incremental refinement" approach:
- **Baseline (Baseline_LogReg)**: 
    - Features: TF-IDF (Term Frequency-Inverse Document Frequency) vectorization with (1, 2)-grams.
    - Algorithm: Logistic Regression wrapped in a `OneVsRestClassifier`.
    - Purpose: Characterize the performance of word-count based statistics.
- **SOTA Iteration (Fine-tuned DistilBERT)**:
    - Base Model: `distilbert-base-uncased`.
    - Strategy: Full fine-tuning on the multi-label objective using the Binary Cross Entropy (BCE) loss.
    - Hyperparameters: Batch size 16, Warmup steps 100, 1-3 epochs.

## 3. Evaluation Framework
Performance is quantified using metrics that account for the multi-label nature and class imbalance:
- **Micro-F1 Score**: The primary metric, calculated by counting total true positives, false negatives, and false positives.
- **Classification Reports**: Per-class precision, recall, and F1 to identify high and low performing emotion categories.
- **Confusion Correlation**: Heatmaps of label overlaps to identify "confusion clusters" (e.g., 'anger' vs. 'annoyance').

## 4. Reproducibility
Every step of the methodology is encapsulated in the `src/` modules, ensuring that the entire pipeline can be re-run with a single command or by executing the research notebook in sequence.
