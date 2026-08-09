from pdf_extractor import extract_text_from_pdf
from resume_analyzer import analyze_resume


pdf_path = "sample_resume.pdf"

resume_text = extract_text_from_pdf(pdf_path)

print("Extracted text:")
print("----------------")
print(resume_text)

result = analyze_resume(resume_text)

print("\nResume Analysis")
print("----------------")
print("Score:", result["score"])
print("Skills:", result["skills"])
print("Projects:", result["projects"])
print("Education:", result["education"])
print("Experience:", result["experience"])
print("Email:", result["email"])
print("Phone:", result["phone"])
print("Sections:", result["sections"])

print("\nSuggestions:")

for suggestion in result["suggestions"]:
    print("-", suggestion)