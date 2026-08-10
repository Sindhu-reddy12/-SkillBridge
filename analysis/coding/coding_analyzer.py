def analyze_coding_profile(
    total_solved,
    easy,
    medium,
    hard,
    github_projects
):
    """
    Analyze a student's coding profile and return
    placement-oriented coding metrics.
    """

    # Basic validation
    total_solved = max(0, total_solved)
    easy = max(0, easy)
    medium = max(0, medium)
    hard = max(0, hard)
    github_projects = max(0, github_projects)

    # Calculate difficulty score
    difficulty_score = (
        easy * 1 +
        medium * 2 +
        hard * 3
    )

    # Cap difficulty contribution
    difficulty_points = min(difficulty_score, 60)

    # Problem-solving points
    problem_points = min(total_solved, 30)

    # GitHub project points
    project_points = min(github_projects * 2, 10)

    # Final coding score
    coding_score = (
        difficulty_points +
        problem_points +
        project_points
    )

    coding_score = min(coding_score, 100)

    # Determine DSA level
    if coding_score >= 80:
        dsa_level = "Advanced"
    elif coding_score >= 60:
        dsa_level = "Intermediate"
    elif coding_score >= 40:
        dsa_level = "Beginner"
    else:
        dsa_level = "Needs Improvement"

    # Problem solving evaluation
    if total_solved >= 200:
        problem_solving = "Excellent"
    elif total_solved >= 100:
        problem_solving = "Good"
    elif total_solved >= 50:
        problem_solving = "Average"
    else:
        problem_solving = "Needs Improvement"

    # Consistency evaluation
    if github_projects >= 5:
        consistency = "Excellent"
    elif github_projects >= 3:
        consistency = "Good"
    elif github_projects >= 1:
        consistency = "Average"
    else:
        consistency = "Needs Improvement"

    # Suggestions
    suggestions = []

    if total_solved < 100:
        suggestions.append(
            "Solve more coding problems regularly."
        )

    if medium < 30:
        suggestions.append(
            "Practice more medium-level problems."
        )

    if hard < 10:
        suggestions.append(
            "Try solving some hard-level problems."
        )

    if github_projects < 3:
        suggestions.append(
            "Build and upload more projects to GitHub."
        )

    if not suggestions:
        suggestions.append(
            "Strong coding profile. Keep practicing consistently."
        )

    return {
        "coding_score": coding_score,
        "dsa_level": dsa_level,
        "problem_solving": problem_solving,
        "consistency": consistency,
        "total_solved": total_solved,
        "easy": easy,
        "medium": medium,
        "hard": hard,
        "github_projects": github_projects,
        "suggestions": suggestions
    }


# Simple test
if __name__ == "__main__":

    result = analyze_coding_profile(
        total_solved=120,
        easy=60,
        medium=45,
        hard=15,
        github_projects=4
    )

    print("=" * 40)
    print("       SKILLBRIDGE CODING REPORT")
    print("=" * 40)

    print("Coding Score     :", result["coding_score"])
    print("DSA Level        :", result["dsa_level"])
    print("Problem Solving  :", result["problem_solving"])
    print("Consistency      :", result["consistency"])

    print("\nProblems Solved")
    print("--------------------")
    print("Total  :", result["total_solved"])
    print("Easy   :", result["easy"])
    print("Medium :", result["medium"])
    print("Hard   :", result["hard"])

    print("\nGitHub Projects")
    print("--------------------")
    print(result["github_projects"])

    print("\nSuggestions")
    print("--------------------")

    for suggestion in result["suggestions"]:
        print("✓", suggestion)