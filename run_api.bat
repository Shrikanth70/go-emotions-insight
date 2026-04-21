@echo off
echo Starting GoEmotions Insight API from root...
uvicorn src.app.main:app --reload
pause
