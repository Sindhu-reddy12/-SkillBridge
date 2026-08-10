from pdf_extractor import extract_text_from_pdf
from resume_analyzer import analyze_resume

pdf_path = "analysis/resume/sample_resume.pdf"

resume_text = extract_text_from_pdf(pdf_path)

result = analyze_resume(resume_text)

print("="*40)
print("        SKILLBRIDGE RESUME REPORT")
print("="*40)

print(f"Resume Score      : {result['score']}/100")
print(f"Projects          : {result['projects']}")
print(f"Education         : {'Yes' if result['education'] else 'No'}")
print(f"Experience        : {'Yes' if result['experience'] else 'No'}")

print("\nDetected Skills")
print("-"*20)

for skill in result["skills"]:
    print("•", skill.title())

print("\nSuggestions")
print("-"*20)

for suggestion in result["suggestions"]:
    print("✓", suggestion)

print("\nOverall Verdict")
print("-"*20)

if result["score"] >= 80:
    print("Excellent resume! Placement ready.")
elif result["score"] >= 60:
    print("Good resume. Improve projects and skills.")
else:
    print("Needs significant improvement.")