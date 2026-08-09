import os
import joblib
import pandas as pd
import numpy as np


# Find the project root from this file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load the trained SkillBridge model
MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "placement_readiness_model.pkl"
)

saved_model = joblib.load(MODEL_PATH)

model = saved_model["model"]
features = saved_model["features"]


def predict_placement_readiness(
    cgpa,
    semester,
    skills_count,
    projects_count,
    internship,
    coding_profile,
    aptitude_score,
    communication_score,
    resume_score
):
    student = pd.DataFrame([{
        "CGPA": cgpa,
        "Semester": semester,
        "Skills_Count": skills_count,
        "Projects_Count": projects_count,
        "Internship": internship,
        "Coding_Profile": coding_profile,
        "Aptitude_Score": aptitude_score,
        "Communication_Score": communication_score,
        "Resume_Score": resume_score
    }])

    prediction = model.predict(student[features])[0]

    prediction = np.clip(prediction, 0, 100)

    return round(float(prediction), 2)