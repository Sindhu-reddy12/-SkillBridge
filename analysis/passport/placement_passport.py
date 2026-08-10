def create_placement_passport(
    student_name,
    resume_score,
    coding_score,
    aptitude_score
):
    """
    Generate a student's SkillBridge Placement Passport.
    """

    # Overall readiness score
    readiness_score = round(
        (resume_score + coding_score + aptitude_score) / 3
    )

    # Readiness level
    if readiness_score >= 80:
        readiness_level = "Placement Ready"
    elif readiness_score >= 60:
        readiness_level = "Nearly Ready"
    elif readiness_score >= 40:
        readiness_level = "Needs Improvement"
    else:
        readiness_level = "Not Ready"

    # Strengths
    strengths = []

    if resume_score >= 70:
        strengths.append("Good resume profile")

    if coding_score >= 70:
        strengths.append("Strong coding skills")

    if aptitude_score >= 70:
        strengths.append("Good aptitude performance")

    # Areas to improve
    improvements = []

    if resume_score < 70:
        improvements.append("Improve resume quality")

    if coding_score < 70:
        improvements.append("Practice more coding problems")

    if aptitude_score < 70:
        improvements.append("Practice aptitude regularly")

    if not strengths:
        strengths.append("Continue building technical skills")

    if not improvements:
        improvements.append(
            "Keep improving projects and technical skills"
        )

    return {
        "student_name": student_name,
        "resume_score": resume_score,
        "coding_score": coding_score,
        "aptitude_score": aptitude_score,
        "readiness_score": readiness_score,
        "readiness_level": readiness_level,
        "strengths": strengths,
        "improvements": improvements
    }


# Simple test
if __name__ == "__main__":

    passport = create_placement_passport(
        student_name="Rahul Sharma",
        resume_score=71,
        coding_score=98,
        aptitude_score=82
    )

    print("=" * 45)
    print("       SKILLBRIDGE PLACEMENT PASSPORT")
    print("=" * 45)

    print("\nStudent:", passport["student_name"])

    print("\nAssessment Scores")
    print("-" * 25)

    print("Resume Score   :", passport["resume_score"])
    print("Coding Score   :", passport["coding_score"])
    print("Aptitude Score :", passport["aptitude_score"])

    print("\nPlacement Readiness")
    print("-" * 25)

    print("Overall Score   :", passport["readiness_score"])
    print("Readiness Level :", passport["readiness_level"])

    print("\nStrengths")
    print("-" * 25)

    for strength in passport["strengths"]:
        print("✓", strength)

    print("\nAreas to Improve")
    print("-" * 25)

    for improvement in passport["improvements"]:
        print("•", improvement)

    print("\n" + "=" * 45)