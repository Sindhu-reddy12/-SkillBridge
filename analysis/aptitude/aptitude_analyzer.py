def analyze_aptitude(quantitative, logical, verbal):
    """
    Analyze aptitude performance for placement readiness.
    Scores are expected to be between 0 and 100.
    """

    quantitative = max(0, min(100, quantitative))
    logical = max(0, min(100, logical))
    verbal = max(0, min(100, verbal))

    overall_score = round(
        (quantitative + logical + verbal) / 3
    )

    if overall_score >= 80:
        level = "Excellent"
    elif overall_score >= 60:
        level = "Good"
    elif overall_score >= 40:
        level = "Average"
    else:
        level = "Needs Improvement"

    suggestions = []

    if quantitative < 60:
        suggestions.append(
            "Practice quantitative aptitude regularly."
        )

    if logical < 60:
        suggestions.append(
            "Practice logical reasoning and problem-solving."
        )

    if verbal < 60:
        suggestions.append(
            "Improve verbal ability and communication skills."
        )

    if not suggestions:
        suggestions.append(
            "Strong aptitude performance. Keep practicing."
        )

    return {
        "overall_score": overall_score,
        "quantitative": quantitative,
        "logical": logical,
        "verbal": verbal,
        "level": level,
        "suggestions": suggestions
    }


# Simple test
if __name__ == "__main__":

    result = analyze_aptitude(
        quantitative=85,
        logical=80,
        verbal=82
    )

    print("=" * 40)
    print("       SKILLBRIDGE APTITUDE REPORT")
    print("=" * 40)

    print("Overall Score :", result["overall_score"])
    print("Level         :", result["level"])

    print("\nSection Scores")
    print("--------------------")
    print("Quantitative  :", result["quantitative"])
    print("Logical       :", result["logical"])
    print("Verbal        :", result["verbal"])

    print("\nSuggestions")
    print("--------------------")

    for suggestion in result["suggestions"]:
        print("✓", suggestion)