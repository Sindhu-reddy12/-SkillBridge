from placement_mentor import placement_mentor


student_profile = {
    "target_role": "Data Scientist",
    "skills": ["Python", "SQL", "Pandas", "Git"],
    "projects": 2,
    "aptitude_score": 65,
    "coding_score": 70
}

question = "I want to become placement-ready. What should I improve first?"

result = placement_mentor(student_profile, question)

print(result)