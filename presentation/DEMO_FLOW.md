# Demo Flow: GoEmotions Insight

To deliver a powerful and professional demo, follow this sequencing:

## 1. The "Why" (The Hook)
- **Action**: Show a complex sentence, e.g., *"I'm so relieved that the confusion is finally over."*
- **Explain**: "Is this positive? Yes. But it’s more than just 'positive'—it’s both 'relief' and 'realization'. Today we’ll show how our model catches both."

## 2. The Research Story (The Notebook)
- **Action**: Open `notebooks/01_goemotions_research_notebook.ipynb`.
- **Explain**: Walk through the "Story" sections.
    - Show the **Class Distribution** plot: "Here is the challenge: the long tail."
    - Show the **Baseline vs Transformer** comparison: "Here is the solution: semantic attention."

## 3. The Live Prediction (The API)
- **Action**: Use the FastAPI documentation (`/docs`) or a simple curl command to send a prediction request.
- **Command**:
  ```bash
  curl -X 'POST' \
    'http://localhost:8000/predict' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "text": "I absolutely love the new update, but I am a bit confused about the pricing.",
    "threshold": 0.4
  }'
  ```
- **Explain**: Show how the model outputs multiple scores, identifying both 'Love' and 'Confusion'.

## 4. The Data Pipeline (The src/)
- **Action**: Briefly show the `src/` folder.
- **Explain**: "Everything is modular. If we want to swap our model for a newer one tomorrow, we just update one file (src/predict.py). This is research-grade architecture."

## 5. The Conclusion (Call to Action)
- **Action**: Return to the `PROJECT_OVERVIEW.md`.
- **Final Word**: "GoEmotions Insight isn't just a classifier; it's a foundation for understanding human affect in a digital world. We're ready for scaling and publication."
