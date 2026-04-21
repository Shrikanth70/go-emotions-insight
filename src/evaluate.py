import json
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
from sklearn.metrics import classification_report, f1_score, confusion_matrix
from src.utils import FIGURES_DIR, METRICS_DIR, EMOTION_LABELS

def evaluate_model(y_true, y_pred, model_name="model"):
    """
    Generate metrics and save to dictionary.
    """
    report = classification_report(y_true, y_pred, target_names=EMOTION_LABELS, output_dict=True)
    f1_micro = f1_score(y_true, y_pred, average='micro')
    f1_macro = f1_score(y_true, y_pred, average='macro')
    
    metrics = {
        "model_name": model_name,
        "f1_micro": f1_micro,
        "f1_macro": f1_macro,
        "detailed_report": report
    }
    
    # Save metrics
    METRICS_DIR.mkdir(parents=True, exist_ok=True)
    with open(METRICS_DIR / f"{model_name}_metrics.json", "w") as f:
        json.dump(metrics, f, indent=4)
        
    return metrics

def plot_f1_scores(metrics_list, save_name="comparison_f1.png"):
    """
    Plot F1 scores for multiple models.
    """
    df_plot = pd.DataFrame(metrics_list)
    
    plt.figure(figsize=(10, 6))
    sns.barplot(x="model_name", y="f1_micro", data=df_plot, palette="viridis")
    plt.title("Micro-F1 Score Comparison")
    plt.ylabel("Micro-F1")
    plt.ylim(0, 1.0)
    
    for i, val in enumerate(df_plot['f1_micro']):
        plt.text(i, val + 0.02, f"{val:.4f}", ha='center', fontweight='bold')
        
    plt.tight_layout()
    plt.savefig(FIGURES_DIR / save_name)
    plt.close()

def plot_confusion_matrix(y_true, y_pred, model_name="model"):
    """
    Plot confusion matrix for the most frequent classes if needed.
    For multi-label, we might need a simplified view or per-class matrices.
    """
    # Simplified multi-label visualization (sum of per-label CMs)
    # This is complex for 28 labels, usually we show a heatmap of label correlations.
    pass

def plot_class_distribution(df, labels=EMOTION_LABELS, save_name="class_distribution.png"):
    """
    Plot frequency of each emotion label.
    """
    label_counts = df[labels].sum().sort_values(ascending=False)
    
    plt.figure(figsize=(12, 8))
    sns.barplot(x=label_counts.values, y=label_counts.index, palette='magma')
    plt.title('Emotion Label Frequency in Dataset')
    plt.xlabel('Count')
    plt.ylabel('Emotion')
    
    plt.tight_layout()
    plt.savefig(FIGURES_DIR / save_name)
    plt.close()
