# Dataset Description: GoEmotions

## 1. Overview
GoEmotions is a corpus of 58,000 carefully curated Reddit comments, labeled for 27 emotion categories plus a "neutral" category. Developed by researchers at Google, it is designed for fine-grained emotion prediction in a multi-label setting.

## 2. Label Taxonomy
The dataset uses a hierarchical taxonomy based on the **Ekman** (6 basic emotions) and **Plutchik** (8 primary emotions) models but expands significantly to capture Reddit's colloquial nuances.

### Emotion Categories (28 total):
1.  **Positive**: Admiration, Amusement, Approval, Caring, Desire, Excitement, Gratitude, Joy, Love, Optimism, Pride, Relief.
2.  **Negative**: Anger, Annoyance, Disappointment, Disapproval, Disgust, Embarrassment, Fear, Grief, Nervousness, Remorse, Sadness.
3.  **Ambiguous**: Confusion, Curiosity, Realization, Surprise.
4.  **Neutral**: Neutral.

## 3. Data Format
- **text**: The raw Reddit comment.
- **id**: Unique identifier for the comment.
- **author**: Reddit username (anonymized in some versions).
- **subreddit**: The subreddit from which the comment was extracted.
- **timestamp**: When the comment was posted.
- **labels**: Multi-label indicators (binary flags for each of the 28 categories).

## 4. Challenges and Characteristics
- **Multi-Label Nature**: Approximately 16% of comments carry more than one label.
- **Informal Language**: The presence of slang, emojis, and internet colloquialisms makes it a perfect testbed for modern NLP models.
- **Imbalance**: The 'neutral' class constitutes nearly 30% of the dataset, while 'grief' and 'pride' are extremely rare (<0.5%).

## 5. Usage in this Project
In this project, we utilize the version of GoEmotions pre-split into multiple CSV files. We process these into a unified dataframe for our training and evaluation pipeline.
