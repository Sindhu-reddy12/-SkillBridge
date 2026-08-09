from gemini_service import ask_gemini


def analyze_skill_gap(student_skills, target_role):
    prompt = f"""
You are an AI Skill Gap Analyzer for SkillBridge.

Student's current skills:
{student_skills}

Target career role:
{target_role}

Analyze the student's skill gap.

Give the response in this format:

1. Current Strengths
2. Missing Skills
3. Priority Skills to Learn
4. Recommended Projects
5. Short Learning Roadmap

Keep the recommendations practical for a college student.
"""

    return ask_gemini(prompt)