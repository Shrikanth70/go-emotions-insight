# Experiments and Results

## 1. Experimental Setup
All experiments were conducted using the following environment:
- **Frameworks**: PyTorch, Transformers, Scikit-learn.
- **Hardware**: CUDA-enabled GPU (optional but recommended for DistilBERT).
- **Split**: 85% Training, 15% Testing.

## 2. Quantitative Results

| Model | Prep Method | Micro-F1 | Macro-F1 | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Logistic Regression** | TF-IDF | ~0.45 | ~0.28 | **Baseline** |
| **DistilBERT** | Fine-tuned 1 Epoch | ~0.58 | ~0.42 | **Iteration 1** |
| **RoBERTa (SOTA)** | Fine-tuned (HuggingFace) | **0.65** | **0.52** | **Reference** |

## 3. Visual Interpretation
- **Class Distribution**: (See `outputs/figures/class_distribution.png`)
    - Shows extreme skewness. This directly correlates with low F1 scores for rare classes like 'grief' and 'pride'.
- **Metrics Comparison**: (See `outputs/figures/comparison_f1.png`)
    - Demonstrates a ~30% improvement in Micro-F1 scores when transitioning from simple TF-IDF to transformer-based embeddings.

## 4. Key Observed Insights
1.  **Semantic Nuance**: The Logistic Regression model performs well on distinct emotions (e.g., 'anger' vs. 'joy') but struggles significantly with overlapping ones (e.g., 'annoyance' vs. 'anger').
2.  **Context Sensitivity**: Transformers excel at identifying emotions that rely on sentence structure rather than specific "trigger words."
3.  **The Neutral Bias**: Due to the high frequency of 'neutral' samples, models tend to predict 'neutral' as a fallback when confidence is low.

## 5. Failures and Error Analysis
- **Sarcasm**: Sarcastic comments are frequently misclassified as the literal emotion they mock.
- **Short Texts**: Comments containing only 1-2 words (e.g., "Oh wow") are often ambiguous and lead to high confusion between 'surprise', 'excitement', and 'realization'.
