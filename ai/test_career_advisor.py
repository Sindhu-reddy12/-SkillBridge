from career_advisor import career_guidance

profile = {
    "career_goal": "Data Scientist",
    "semester": 5,
    "cgpa": 8.7,
    "skills": ["Python", "SQL", "Pandas"],
    "programming_languages": ["Python"],
    "projects": ["SkillBridge", "Fake News Detection"],
    "internship": "Python internship"
}

result = career_guidance(profile)

print(result)