# Slide-by-Slide PPT Content: GoEmotions Insight

## Slide 1: Title
**Title**: GoEmotions Insight: Deep Affective Analysis
**Subtitle**: Bridging the Gap from Sentiment to Fine-Grained Emotion
**Presenter**: [Your Name]

## Slide 2: The Problem
- **Point 1**: Human emotion is complex and multi-faceted.
- **Point 2**: Sentiment analysis (Pos/Neg) is too reductive for research and deep clinical application.
- **Image Idea**: Spectrum graph of many emotions vs. a simple +/- toggle.

## Slide 3: Motivation
- Affective Computing in Mental Health.
- Tailored Customer Experiences.
- Building Empathy into AI Systems.

## Slide 4: The Dataset: Google's GoEmotions
- Largest curated emotion dataset (58k Reddit comments).
- 28 granular emotion categories.
- Multi-label: One sentence, multiple feelings.

## Slide 5: Methodology Overview
1.  **Baseline**: Traditional Statistics (TF-IDF + LogReg).
2.  **SOTA**: Modern Deep Learning (Fine-tuned DistilBERT).
3.  **Metrics**: Micro-F1 and per-class analysis.

## Slide 6: Results & Comparison
- Micro-F1 Baseline: ~0.45.
- Micro-F1 Transformer: **~0.58+**.
- **Observation**: 30% jump in performance with Transformers.

## Slide 7: Visual Insights
- **Imbalance**: Class frequency skewness (The Long Tail).
- **Confusion Clusters**: High correlation between 'anger' and 'annoyance'.

## Slide 8: Future Directions
- Addressing Data Imbalance (Focal Loss).
- LLM Zero-Shot comparison.

## Slide 9: Conclusion
- Semantic context is essential for emotion recognition.
- Our modular pipeline is a platform for ongoing research.

## Slide 10: Q&A
- Thank you! Any questions?
