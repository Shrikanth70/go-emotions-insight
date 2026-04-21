# Abstract: Fine-Grained Emotion Classification using the GoEmotions Taxonomy

**Authors**: Research Team, GoEmotions Insight
**Keywords**: Affective Computing, NLP, Transformers, Multi-Label Classification, GoEmotions

### Abstract
This study investigates the performance of discriminative machine learning models on the GoEmotions dataset, a large-scale corpus of Reddit comments labeled with 27 distinct emotion categories. We contrast a traditional baseline model—utilizing TF-IDF vectorization and Logistic Regression—against a state-of-the-art approach using fine-tuned Transformer architectures (DistilBERT). Our results indicate that while baseline models provide a reliable statistical floor, the attention-based mechanisms of Transformers are essential for capturing the semantic nuances and contextual dependencies inherent in human emotive expression. Specifically, we achieve a Micro-F1 score of ~0.58 with a single epoch of fine-tuning, representing a significant improvement over the baseline’s ~0.45. We discuss the implications of class imbalance on model reliability and propose paths for future research in hierarchical emotion classification and architectural optimizations for rare emotion detection.
