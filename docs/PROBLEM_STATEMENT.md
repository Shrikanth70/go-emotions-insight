# Problem Statement: The Complexity of Affective Text Analysis

## 1. The Core Challenge
Textual data is inherently nuanced. Traditional sentiment analysis (Positive, Negative, Neutral) often fails to capture the intricate spectrum of human emotion. A simple "I'm okay" could be 'relief', 'sadness', or 'acceptance' depending on the context. Identifying these precise emotions is known as **Affective Computing** and presents a significant challenge for machine learning models.

## 2. Why it Matters
Research in emotion classification has profound implications for several domains:
- **Mental Health**: Early detection of shifts in affective state in social media or counseling transcripts.
- **Customer Experience**: Going beyond "angry" to distinguish between 'annoyance', 'disappointment', and 'frustration' allows for more tailored resolutions.
- **Human-AI Interaction**: Ensuring that Large Language Models (LLMs) and chatbots respond with appropriate empathy and emotional intelligence.

## 3. Technical Bottlenecks
- **Label Granularity**: The transition from 3 sentiment classes to 28 emotion classes (GoEmotions) exponentially increases the complexity of the feature space.
- **Class Imbalance**: In natural conversation (like Reddit), emotions like 'gratitude' are common, while 'grief' or 'remorse' are rare, leading to models that underperform on critical low-frequency classes.
- **Multi-Label Nature**: Text often expresses multiple emotions simultaneously, requiring models to predict a distribution of labels rather than a single category.

## 4. Research Objective
This project seeks to address these challenges by evaluating how modern Transformer architectures can bridge the gap between simple word-count baselines and the deep semantic understanding required for high-fidelity emotion classification.
