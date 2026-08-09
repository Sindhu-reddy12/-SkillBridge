from skill_gap import analyze_skill_gap


student_skills = ["Python", "SQL", "Pandas", "Git"]
target_role = "Data Scientist"

result = analyze_skill_gap(student_skills, target_role)

print(result)