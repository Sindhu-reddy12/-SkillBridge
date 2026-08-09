from gemini_service import ask_gemini


def career_guidance(profile):
    prompt = f"""
You are an AI career advisor for SkillBridge, an AI-powered placement readiness platform.

Analyze the following student's profile:

Career Goal: {profile.get("career_goal")}
Semester: {profile.get("semester")}
CGPA: {profile.get("cgpa")}
Skills: {profile.get("skills")}
Programming Languages: {profile.get("programming_languages")}
Projects: {profile.get("projects")}
Internship Experience: {profile.get("internship")}

Provide:

1. Career Readiness Score out of 100
2. Current Strengths
3. Missing Skills
4. Recommended Certifications
5. Suggested Projects
6. Personalized Learning Roadmap
7. Estimated time to become job-ready

Give practical recommendations suitable for a college student preparing for placements.
Keep the response clear and structured.
"""

    return ask_gemini(prompt)