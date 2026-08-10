from resume.resume_analyzer import analyze_resume
from coding.coding_analyzer import analyze_coding_profile
from aptitude.aptitude_analyzer import analyze_aptitude
from passport.placement_passport import create_placement_passport

def generate_student_analysis(
    student_name,
    resume_text,
    total_solved,
    easy,
    medium,
    hard,
    github_projects,
    quantitative,
    logical,
    verbal
):
    """
    Generate a complete SkillBridge analysis
    for one student.
    """

    # Resume analysis
    resume_result = analyze_resume(resume_text)

    # Coding analysis
    coding_result = analyze_coding_profile(
        total_solved,
        easy,
        medium,
        hard,
        github_projects
    )

    # Aptitude analysis
    aptitude_result = analyze_aptitude(
        quantitative,
        logical,
        verbal
    )

    # Placement passport
    passport = create_placement_passport(
        student_name,
        resume_result["score"],
        coding_result["coding_score"],
        aptitude_result["overall_score"]
    )

    return {
        "student_name": student_name,
        "resume": resume_result,
        "coding": coding_result,
        "aptitude": aptitude_result,
        "passport": passport
    }


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

    Experience
    Software Development Intern
    """

    result = generate_student_analysis(
        student_name="Rahul Sharma",
        resume_text=sample_resume,
        total_solved=120,
        easy=60,
        medium=45,
        hard=15,
        github_projects=4,
        quantitative=85,
        logical=80,
        verbal=82
    )

    print("=" * 45)
    print("       SKILLBRIDGE COMPLETE ANALYSIS")
    print("=" * 45)

    print("\nStudent:", result["student_name"])

    print("\nResume Score   :", result["resume"]["score"])
    print("Coding Score   :", result["coding"]["coding_score"])
    print("Aptitude Score :", result["aptitude"]["overall_score"])

    print("\nPlacement Readiness")
    print("-------------------------")
    print("Score :", result["passport"]["readiness_score"])
    print("Level :", result["passport"]["readiness_level"])