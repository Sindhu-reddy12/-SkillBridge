from .gemini_service import ask_gemini


def generate_recommendations(student_profile):
    prompt = f"""
You are SkillBridge AI Recommendation Engine.

Student Profile:
{student_profile}

Based on this student's profile, generate personalized placement recommendations.

Give the response in this format:

1. Skills to Learn
2. Coding Practice
3. Projects to Build
4. Certifications to Consider
5. Interview Preparation
6. Weekly Action Plan

Prioritize the recommendations based on the student's current weaknesses and target career.

Do not give generic recommendations.
Keep them practical and suitable for a college student.
"""

    return ask_gemini(prompt)
