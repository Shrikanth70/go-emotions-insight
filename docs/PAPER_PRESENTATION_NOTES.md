# Paper Presentation Notes: GoEmotions Discovery

## Project Pitch (1-Minute Elevator)
"Our project, GoEmotions Insight, tackles the challenge of high-granularity emotion classification. While standard sentiment analysis only gives you 'good' or 'bad', our research distinguishes between 28 subtle affective states—like 'admiration' versus 'approval'. We've built a modular, research-ready pipeline that benchmarks traditional statistics against modern Transformers, proving that semantic context is the key to understanding human emotion in digital spaces."

## Key Slides and Talking Points

### 1. Slide: The Problem Statement
- **Point**: Sentiment is a spectrum, not a binary.
- **Narrative**: "We see text as a container of multiple, overlapping emotions. The challenge is identifying these in short, noisy Reddit comments."

### 2. Slide: Dataset Visuals (Distribution Plot)
- **Point**: Class imbalance is the elephant in the room.
- **Narrative**: "Notice how 'Neutral' and 'Admiration' dominate. This isn't just a data quirk; it's how people communicate. Research models must be robust enough to handle the sparse 'tail' of the data."

### 3. Slide: Methodology (Baseline vs Transformer)
- **Point**: From word-counts to self-attention.
- **Narrative**: "We established a strong baseline with TF-IDF/LogReg, but the real breakthrough came from fine-tuning DistilBERT, which improved our Micro-F1 by nearly 30%."

### 4. Slide: Results Table
- **Point**: Quantitative evidence.
- **Narrative**: "Our results track closely with SOTA benchmarks, confirming our pipeline's reliability."

### 5. Slide: Future Work
- **Point**: We're just getting started.
- **Narrative**: "The next step is applying Focal Loss to boost performance on minority labels and testing the zero-shot capabilities of LLMs as secondary annotators."

## Q&A Preparation (Anticipated Questions)
- **"Why 28 labels?"**: To capture the full taxonomy of human affect as defined by Google researchers; more granular than Ekman's 6 basic emotions.
- **"How did you handle multi-labels?"**: We used a Binary Cross Entropy (BCE) objective, allowing the model to predict independent probabilities for each class.
- **"What was the biggest failure mode?"**: Sarcasm and extremely short, ambiguous sentences.
