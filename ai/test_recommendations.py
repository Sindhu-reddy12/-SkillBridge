from recommendations import generate_recommendations


student_profile = {
    "target_role": "Data Scientist",
    "skills": ["Python", "SQL", "Pandas", "Git"],
    "projects": 2,
    "aptitude_score": 65,
    "coding_score": 70,
    "experience": "Beginner"
}

result = generate_recommendations(student_profile)

print(result)