from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ml.src.predict import predict_placement_readiness

from ai.career_advisor import career_guidance
from ai.skill_gap import analyze_skill_gap
from ai.placement_mentor import placement_mentor
from ai.recommendations import generate_recommendations


app = FastAPI(title="SkillBridge ML + AI API")


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# EXISTING ML MODEL INPUT
# DO NOT CHANGE THESE FIELDS
# =========================================================

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


# =========================================================
# AI PROFILE INPUT
# Used by Person 2's Gemini modules
# =========================================================

class AIStudentProfile(BaseModel):
    fullName: str = ""
    email: str = ""
    college: str = ""
    branch: str = ""

    # Numeric fields from the frontend
    semester: int | None = None
    cgpa: float | None = None

    careerGoal: str = ""
    skills: str = ""
    programmingLanguages: str = ""
    projects: str = ""
    internship: str = ""
    codingPlatform: str = ""
    codingProfile: str = ""

    # Optional ML/readiness information
    skillsCount: int | None = None
    projectsCount: int | None = None
    aptitudeScore: float | None = None
    communicationScore: float | None = None
    resumeScore: float | None = None
    placementReadiness: float | None = None


class SkillGapRequest(BaseModel):
    student_skills: str
    target_role: str


class PlacementMentorRequest(BaseModel):
    student_profile: AIStudentProfile
    question: str


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "SkillBridge ML + AI API is running"
    }


# =========================================================
# EXISTING ML PREDICTION
# DO NOT MODIFY
# =========================================================

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


# =========================================================
# HELPER
# Convert frontend profile format to Person 2 AI format
# =========================================================

def convert_profile_to_ai_format(profile: AIStudentProfile):
    return {
        "full_name": profile.fullName,
        "email": profile.email,
        "college": profile.college,
        "branch": profile.branch,
        "career_goal": profile.careerGoal,
        "semester": profile.semester,
        "cgpa": profile.cgpa,
        "skills": profile.skills,
        "programming_languages": profile.programmingLanguages,
        "projects": profile.projects,
        "internship": profile.internship,
        "coding_platform": profile.codingPlatform,
        "coding_profile": profile.codingProfile,
        "skills_count": profile.skillsCount,
        "projects_count": profile.projectsCount,
        "aptitude_score": profile.aptitudeScore,
        "communication_score": profile.communicationScore,
        "resume_score": profile.resumeScore,
        "placement_readiness": profile.placementReadiness,
    }


# =========================================================
# GEMINI - CAREER GUIDANCE
# =========================================================

@app.post("/career-guidance")
def career_guidance_endpoint(profile: AIStudentProfile):

    ai_profile = convert_profile_to_ai_format(profile)

    result = career_guidance(ai_profile)

    return {
        "career_guidance": result
    }


# =========================================================
# GEMINI - SKILL GAP ANALYSIS
# =========================================================

@app.post("/skill-gap")
def skill_gap_endpoint(request: SkillGapRequest):

    result = analyze_skill_gap(
        request.student_skills,
        request.target_role
    )

    return {
        "skill_gap": result
    }


# =========================================================
# GEMINI - PLACEMENT MENTOR
# =========================================================

@app.post("/placement-mentor")
def placement_mentor_endpoint(request: PlacementMentorRequest):

    ai_profile = convert_profile_to_ai_format(
        request.student_profile
    )

    result = placement_mentor(
        ai_profile,
        request.question
    )

    return {
        "placement_mentor": result
    }


# =========================================================
# GEMINI - RECOMMENDATIONS
# =========================================================

@app.post("/recommendations")
def recommendations_endpoint(profile: AIStudentProfile):

    ai_profile = convert_profile_to_ai_format(profile)

    result = generate_recommendations(ai_profile)

    return {
        "recommendations": result
    }