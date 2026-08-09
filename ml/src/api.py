from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ml.src.predict import predict_placement_readiness


app = FastAPI(title="SkillBridge ML API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StudentProfile(BaseModel):
    CGPA: float
    Semester: int
    Skills_Count: int
    Projects_Count: int
    Internship: int
    Coding_Profile: int
    Aptitude_Score: float
    Communication_Score: float
    Resume_Score: float


@app.get("/")
def home():
    return {
        "message": "SkillBridge ML API is running"
    }


@app.post("/predict")
def predict(profile: StudentProfile):

    readiness = predict_placement_readiness(
        profile.CGPA,
        profile.Semester,
        profile.Skills_Count,
        profile.Projects_Count,
        profile.Internship,
        profile.Coding_Profile,
        profile.Aptitude_Score,
        profile.Communication_Score,
        profile.Resume_Score
    )

    return {
        "placement_readiness": readiness
    }