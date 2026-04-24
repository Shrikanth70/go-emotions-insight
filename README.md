# GoEmotions Insight: Deep Affective Computing with Transformers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/release/python-380/)
[![Framework: FASTAPI](https://img.shields.io/badge/framework-FASTAPI-009688.svg?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

> **A professional, publication-ready repository for fine-grained emotion recognition using the GoEmotions dataset.**

---

## 🚀 Project Overview

**GoEmotions Insight** is an end-to-end research project that explores the classification of 27 distinct human emotions in social media text. By contrasting traditional statistical baselines with state-of-the-art **Transformer models (DistilBERT)**, this project provides a benchmark and a modular framework for researchers and developers in the field of Affective Computing.

### Key Features
- **Modular Pipeline**: Decoupled modules for data loading, preprocessing, training, and inference.
- **Research-First Notebooks**: High-fidelity Jupyter notebooks that tell the "story" of the data and models.
- **Academic Documentation**: Comprehensive guides covering methodology, reproducibility, and paper defense.
- **FastAPI Backend**: A production-ready inference service for real-time emotion analysis.
- **Publication Artifacts**: Pre-drafted abstracts, outlines, and presentation materials.

---

## 📁 Repository Structure

```text
├── data/               # Raw and processed dataset versions
├── docs/               # 9+ Professional Academic Documentation files
├── notebooks/          # High-fidelity Research & EDA notebooks
├── src/                # Modular Python Package (Core Logic)
│   ├── app/            # FastAPI Backend Application
│   └── (modules)       # data_loader, preprocess, train, predict, etc.
├── models/             # Saved model artifacts & tokenizers (Git Ignored)
├── outputs/            # Figures, metrics, and CSV results (Git Ignored)
├── paper/              # Academic paper drafts and outlines
├── presentation/       # PPT content and speaker notes
├── requirements.txt    # Project dependencies
├── run_api.bat        # Helper script to launch API
├── web/                # React Frontend Dashboard
└── README.md           # You are here!
```

---

## 🛠️ Quick Start

### 1. Installation
```bash
git clone https://github.com/Shrikanth70/go-emotions-insight.git
cd go-emotions-insight
pip install -r requirements.txt
```

### 2. Launch the Research Portal
Navigate to the `web/` directory and start the frontend:
```bash
cd web
npm install
npm run dev
```

### 3. Start the Backend API
Use the provided batch script or run directly:
```bash
run_api.bat
# OR
uvicorn src.app.main:app --reload
```

---

## 📈 Research Methodology

Our research follows a rigorous path from statistical baselines to deep learning:

1.  **Exploratory Data Analysis (EDA)**: Visualizing the "Long Tail" of human emotion distribution.
2.  **Baseline Modeling**: Using TF-IDF and Logistic Regression to establish a performance floor.
3.  **Transformer Fine-Tuning**: Leveraging attention mechanisms via DistilBERT for contextual understanding.
4.  **Evaluation**: Comparative analysis using Micro-F1 and per-class precision-recall curves.

*For full details, see [METHODOLOGY.md](docs/METHODOLOGY.md).*

---

## 📜 Documentation & Publication
This repository contains a full suite of materials for paper submission and presentation:
- **Paper**: [ABSTRACT_DRAFT.md](paper/ABSTRACT_DRAFT.md) | [PAPER_OUTLINE.md](paper/PAPER_OUTLINE.md)
- **Presentation**: [PPT_CONTENT.md](presentation/PPT_CONTENT.md) | [SPEAKER_NOTES.md](presentation/SPEAKER_NOTES.md)
- **Guides**: [BEGINNER_GUIDE.md](docs/BEGINNER_GUIDE.md) | [REPRODUCIBILITY_GUIDE.md](docs/REPRODUCIBILITY_GUIDE.md)


---

## 📄 License
This project is licensed under the MIT License.
