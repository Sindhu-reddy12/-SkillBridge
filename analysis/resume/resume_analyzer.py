import re


def analyze_resume(resume_text):
    """
    Analyze a student's resume and return useful placement metrics.
    """

    if not resume_text or not resume_text.strip():
        return {
            "score": 0,
            "skills": [],
            "projects": 0,
            "education": False,
            "experience": False,
            "email": False,
            "phone": False,
            "sections": [],
            "suggestions": [
                "Upload or provide a valid resume."
            ]
        }

    text = resume_text.lower()

    # Common technical skills
    skill_keywords = [
        "python",
        "java",
        "c++",
        "javascript",
        "react",
        "node.js",
        "html",
        "css",
        "sql",
        "mongodb",
        "mysql",
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "tensorflow",
        "pytorch",
        "aws",
        "azure",
        "docker",
        "git",
        "github"
    ]

    found_skills = []

    for skill in skill_keywords:
        if skill in text:
            found_skills.append(skill)

    # Important resume sections
    sections = []

    section_keywords = {
        "education": [
            "education",
            "degree",
            "b.tech",
            "b.e",
            "university"
        ],
        "experience": [
            "experience",
            "internship",
            "intern"
        ],
        "projects": [
            "projects",
            "project"
        ],
        "skills": [
            "skills",
            "technical skills"
        ],
        "certifications": [
            "certification",
            "certifications"
        ]
    }

    for section, keywords in section_keywords.items():
        if any(keyword in text for keyword in keywords):
            sections.append(section)

    # Count project occurrences
    project_matches = re.findall(
        r"\bprojects?\b",
        text
    )

    project_count = min(len(project_matches), 10)

    # Contact information
    email_found = bool(
        re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            resume_text
        )
    )

    phone_found = bool(
        re.search(
            r"\b\d{10}\b",
            resume_text
        )
    )

    education_found = "education" in sections
    experience_found = "experience" in sections

    # Calculate score
    score = 0

    score += min(len(found_skills) * 3, 30)
    score += min(project_count * 5, 20)
    score += 15 if education_found else 0
    score += 15 if experience_found else 0
    score += 5 if email_found else 0
    score += 5 if phone_found else 0
    score += min(len(sections) * 2, 10)

    score = min(score, 100)

    # Suggestions
    suggestions = []

    if len(found_skills) < 5:
        suggestions.append(
            "Add more relevant technical skills."
        )

    if project_count == 0:
        suggestions.append(
            "Add academic or personal projects."
        )

    if not education_found:
        suggestions.append(
            "Add a clear Education section."
        )

    if not experience_found:
        suggestions.append(
            "Add internship or work experience if available."
        )

    if not email_found:
        suggestions.append(
            "Add a professional email address."
        )

    if not phone_found:
        suggestions.append(
            "Add a valid contact number."
        )

    if not suggestions:
        suggestions.append(
            "Resume looks good. Keep improving projects and skills."
        )

    return {
        "score": score,
        "skills": found_skills,
        "projects": project_count,
        "education": education_found,
        "experience": experience_found,
        "email": email_found,
        "phone": phone_found,
        "sections": sections,
        "suggestions": suggestions
    }


# Simple test
if __name__ == "__main__":

    sample_resume = """
    Rahul Sharma
    rahul@gmail.com
    9876543210

    Education
    B.Tech Computer Science Engineering

    Skills
    Python, Java, SQL, React, Git, Machine Learning

    Projects
    AI Resume Analyzer
    Student Placement Prediction System

    Internship
    Software Development Intern
    """

    result = analyze_resume(sample_resume)

    print("Resume Analysis")
    print("----------------")
    print("Score:", result["score"])
    print("Skills:", result["skills"])
    print("Projects:", result["projects"])
    print("Education:", result["education"])
    print("Experience:", result["experience"])
    print("Email:", result["email"])
    print("Phone:", result["phone"])
    print("Sections:", result["sections"])
    print("Suggestions:")

    for suggestion in result["suggestions"]:
        print("-", suggestion)