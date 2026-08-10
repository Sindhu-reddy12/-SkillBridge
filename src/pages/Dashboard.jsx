import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_URL = "http://127.0.0.1:8000";

function Dashboard() {
  const [profile, setProfile] = useState({});
  const [readiness, setReadiness] = useState(0);

  // ==============================
  // AI STATES
  // ==============================

  const [careerGuidance, setCareerGuidance] = useState("");
  const [skillGap, setSkillGap] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [mentorResponse, setMentorResponse] = useState("");

  const [mentorQuestion, setMentorQuestion] = useState("");

  const [aiLoading, setAiLoading] = useState({
    career: false,
    skillGap: false,
    recommendations: false,
    mentor: false,
  });

  const [aiError, setAiError] = useState("");

  // ==============================
  // LOAD PROFILE
  // ==============================

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");
    const savedReadiness = localStorage.getItem("placementReadiness");

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error("Failed to read student profile:", error);
      }
    }

    if (savedReadiness) {
      setReadiness(Number(savedReadiness));
    }
  }, []);

  // ==============================
  // ML MODEL INPUT VALUES
  // ==============================

  const codingProfileScore =
    profile.codingProfile !== undefined &&
    profile.codingProfile !== ""
      ? Number(profile.codingProfile)
      : 0;

  // ML model uses Coding_Profile on 0-10 scale.
  // Dashboard displays percentage.
  const codingScore = codingProfileScore * 10;

  const aptitudeScore =
    profile.aptitudeScore !== undefined &&
    profile.aptitudeScore !== ""
      ? Number(profile.aptitudeScore)
      : 0;

  const communicationScore =
    profile.communicationScore !== undefined &&
    profile.communicationScore !== ""
      ? Number(profile.communicationScore)
      : 0;

  const resumeScore =
    profile.resumeScore !== undefined &&
    profile.resumeScore !== ""
      ? Number(profile.resumeScore)
      : 0;

  const skillsCount =
    profile.skillsCount !== undefined &&
    profile.skillsCount !== ""
      ? Number(profile.skillsCount)
      : 0;

  const projectsCount =
    profile.projectsCount !== undefined &&
    profile.projectsCount !== ""
      ? Number(profile.projectsCount)
      : 0;

  const internshipCount =
    profile.internship !== undefined &&
    profile.internship !== ""
      ? Number(profile.internship)
      : 0;

  // ==============================
  // READINESS MESSAGE
  // ==============================

  const readinessMessage =
    readiness >= 80
      ? "Excellent! You're well prepared for placements."
      : readiness >= 70
      ? "You're making good progress. Keep improving your skills."
      : readiness >= 60
      ? "You're on the right track. Focus on your weaker areas."
      : "Keep working on your skills and placement preparation.";

  // ==============================
  // BUILD AI PROFILE
  // ==============================

  const getAIProfile = () => {
    const savedAIProfile = localStorage.getItem("aiStudentProfile");

    if (savedAIProfile) {
      try {
        return JSON.parse(savedAIProfile);
      } catch (error) {
        console.error("Failed to read AI profile:", error);
      }
    }

    // Fallback for older saved profiles
    return {
      fullName: profile.fullName || "",
      email: profile.email || "",
      college: profile.college || "",
      branch: profile.branch || "",

      semester:
        profile.semester !== undefined && profile.semester !== ""
          ? Number(profile.semester)
          : null,

      cgpa:
        profile.cgpa !== undefined && profile.cgpa !== ""
          ? Number(profile.cgpa)
          : null,

      careerGoal: profile.careerGoal || "",
      skills: profile.skills || "",
      programmingLanguages: profile.programmingLanguages || "",

      projects: profile.projects || "",

      internship:
        profile.internship !== undefined
          ? String(profile.internship)
          : "",

      codingPlatform: profile.codingPlatform || "",

      codingProfile:
        profile.codingProfile !== undefined
          ? String(profile.codingProfile)
          : "",

      skillsCount: skillsCount,
      projectsCount: projectsCount,

      aptitudeScore: aptitudeScore,
      communicationScore: communicationScore,
      resumeScore: resumeScore,

      placementReadiness: readiness,
    };
  };

  // ==============================
  // GENERIC AI REQUEST
  // ==============================

  const callAI = async (endpoint, body, type) => {
    setAiError("");

    setAiLoading((prev) => ({
      ...prev,
      [type]: true,
    }));

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail
            ? JSON.stringify(data.detail)
            : "AI request failed"
        );
      }

      return data;
    } catch (error) {
      console.error(`${type} AI error:`, error);

      setAiError(
        `Could not connect to the AI service. Make sure the FastAPI server is running on port 8000.`
      );

      return null;
    } finally {
      setAiLoading((prev) => ({
        ...prev,
        [type]: false,
      }));
    }
  };

  // ==============================
  // CAREER GUIDANCE
  // ==============================

  const handleCareerGuidance = async () => {
    const aiProfile = getAIProfile();

    const data = await callAI(
      "/career-guidance",
      aiProfile,
      "career"
    );

    if (data) {
      setCareerGuidance(data.career_guidance || "");
    }
  };

  // ==============================
  // SKILL GAP
  // ==============================

  const handleSkillGap = async () => {
    const aiProfile = getAIProfile();

    const data = await callAI(
      "/skill-gap",
      {
        student_skills: aiProfile.skills || "",
        target_role: aiProfile.careerGoal || "",
      },
      "skillGap"
    );

    if (data) {
      setSkillGap(data.skill_gap || "");
    }
  };

  // ==============================
  // RECOMMENDATIONS
  // ==============================

  const handleRecommendations = async () => {
    const aiProfile = getAIProfile();

    const data = await callAI(
      "/recommendations",
      aiProfile,
      "recommendations"
    );

    if (data) {
      setRecommendations(data.recommendations || "");
    }
  };

  // ==============================
  // PLACEMENT MENTOR
  // ==============================

  const handleMentor = async () => {
    if (!mentorQuestion.trim()) {
      setAiError("Please enter a question for the Placement Mentor.");
      return;
    }

    const aiProfile = getAIProfile();

    const data = await callAI(
      "/placement-mentor",
      {
        student_profile: aiProfile,
        question: mentorQuestion,
      },
      "mentor"
    );

    if (data) {
      setMentorResponse(data.placement_mentor || "");
    }
  };

  return (
    <div>
      <Navbar />

      <main className="dashboard-content">

        {/* ================= WELCOME ================= */}

        <section className="welcome-section">
          <h1>
            Welcome back, {profile.fullName || "Student"}!
          </h1>

          <p>
            Here's your placement readiness overview.
          </p>
        </section>


        {/* ================= ML READINESS ================= */}

        <section className="readiness-card">

          <div>
            <p className="card-label">
              Placement Readiness
            </p>

            <h2>
              {readiness.toFixed(2)}%
            </h2>

            <p>
              {readinessMessage}
            </p>
          </div>

          <div className="readiness-circle">
            {Math.round(readiness)}%
          </div>

        </section>


        {/* ================= SCORE CARDS ================= */}

        <section className="score-grid">

          {/* Resume */}

          <div className="score-card">
            <span>📄</span>

            <h3>
              Resume Score
            </h3>

            <strong>
              {resumeScore}%
            </strong>

            <p>
              Resume quality
            </p>
          </div>


          {/* Coding */}

          <div className="score-card">
            <span>💻</span>

            <h3>
              Coding Profile
            </h3>

            <strong>
              {codingScore}%
            </strong>

            <p>
              Coding profile score
            </p>
          </div>


          {/* Aptitude */}

          <div className="score-card">
            <span>📝</span>

            <h3>
              Aptitude Score
            </h3>

            <strong>
              {aptitudeScore}%
            </strong>

            <p>
              Latest assessment
            </p>
          </div>


          {/* Communication */}

          <div className="score-card">
            <span>🗣️</span>

            <h3>
              Communication
            </h3>

            <strong>
              {communicationScore}%
            </strong>

            <p>
              Communication assessment
            </p>
          </div>

        </section>


        {/* ================= ML INPUT SUMMARY ================= */}

        <section className="dashboard-grid">

          <div className="dashboard-card">

            <h2>
              ML Profile Inputs 🤖
            </h2>

            <div className="profile-summary">

              <p>
                <strong>CGPA:</strong>{" "}
                {profile.cgpa || "-"}
              </p>

              <p>
                <strong>Semester:</strong>{" "}
                {profile.semester || "-"}
              </p>

              <p>
                <strong>Skills Count:</strong>{" "}
                {skillsCount}
              </p>

              <p>
                <strong>Projects Count:</strong>{" "}
                {projectsCount}
              </p>

              <p>
                <strong>Number of Internships:</strong>{" "}
                {internshipCount}
              </p>

              <p>
                <strong>Coding Profile Score:</strong>{" "}
                {codingProfileScore}/10
              </p>

              <p>
                <strong>Aptitude Score:</strong>{" "}
                {aptitudeScore}
              </p>

              <p>
                <strong>Communication Score:</strong>{" "}
                {communicationScore}
              </p>

              <p>
                <strong>Resume Score:</strong>{" "}
                {resumeScore}
              </p>

            </div>

          </div>


          {/* ================= PROFILE INFORMATION ================= */}

          <div className="dashboard-card">

            <h2>
              Profile Information 👤
            </h2>

            <div className="profile-summary">

              <p>
                <strong>Career Goal:</strong>{" "}
                {profile.careerGoal || "-"}
              </p>

              <p>
                <strong>Branch:</strong>{" "}
                {profile.branch || "-"}
              </p>

              <p>
                <strong>College:</strong>{" "}
                {profile.college || "-"}
              </p>

              <p>
                <strong>Programming Languages:</strong>{" "}
                {profile.programmingLanguages || "-"}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {profile.skills || "-"}
              </p>

              <p>
                <strong>Projects:</strong>{" "}
                {profile.projects || "-"}
              </p>

              <p>
                <strong>Internship Details:</strong>{" "}
                {profile.internshipDetails || "-"}
              </p>

            </div>

          </div>

        </section>


        {/* ================= CODING PROFILE ================= */}

        <section className="dashboard-card coding-profile-card">

          <h2>
            Coding Profile 💻
          </h2>

          <p>
            <strong>Platform:</strong>{" "}
            {profile.codingPlatform || "Not provided"}
          </p>

          <p>
            <strong>ML Coding Score:</strong>{" "}
            {codingProfileScore}/10
          </p>

          <p>
            <strong>Percentage:</strong>{" "}
            {codingScore}%
          </p>

          {profile.codingProfileLink ? (
            <p>
              <strong>Profile:</strong>{" "}

              <a
                href={profile.codingProfileLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Coding Profile →
              </a>
            </p>
          ) : (
            <p>
              No coding profile link provided.
            </p>
          )}

        </section>


        {/* ===================================================== */}
        {/* ================= AI FEATURES ======================= */}
        {/* ===================================================== */}

        <section className="dashboard-card">

          <h2>
            AI Placement Assistant 🤖
          </h2>

          <p>
            Get personalized guidance based on your actual
            student profile and ML placement readiness.
          </p>

          {aiError && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              {aiError}
            </p>
          )}

          {/* ================= AI BUTTONS ================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >

            <button
              type="button"
              onClick={handleCareerGuidance}
              disabled={aiLoading.career}
            >
              {aiLoading.career
                ? "Generating..."
                : "🎯 Career Guidance"}
            </button>


            <button
              type="button"
              onClick={handleSkillGap}
              disabled={aiLoading.skillGap}
            >
              {aiLoading.skillGap
                ? "Analyzing..."
                : "📊 Skill Gap Analysis"}
            </button>


            <button
              type="button"
              onClick={handleRecommendations}
              disabled={aiLoading.recommendations}
            >
              {aiLoading.recommendations
                ? "Generating..."
                : "💡 AI Recommendations"}
            </button>

          </div>


          {/* ================= CAREER GUIDANCE RESULT ================= */}

          {careerGuidance && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                borderRadius: "12px",
                background: "#f8f9fa",
              }}
            >

              <h3>
                🎯 Career Guidance
              </h3>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.7",
                }}
              >
                {careerGuidance}
              </div>

            </div>
          )}


          {/* ================= SKILL GAP RESULT ================= */}

          {skillGap && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                borderRadius: "12px",
                background: "#f8f9fa",
              }}
            >

              <h3>
                📊 Skill Gap Analysis
              </h3>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.7",
                }}
              >
                {skillGap}
              </div>

            </div>
          )}


          {/* ================= RECOMMENDATIONS RESULT ================= */}

          {recommendations && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                borderRadius: "12px",
                background: "#f8f9fa",
              }}
            >

              <h3>
                💡 AI Recommendations
              </h3>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.7",
                }}
              >
                {recommendations}
              </div>

            </div>
          )}


          {/* ================= PLACEMENT MENTOR ================= */}

          <div
            style={{
              marginTop: "30px",
              paddingTop: "25px",
              borderTop: "1px solid #ddd",
            }}
          >

            <h3>
              💬 AI Placement Mentor
            </h3>

            <p>
              Ask the mentor anything about your placement
              preparation.
            </p>

            <textarea
              value={mentorQuestion}
              onChange={(e) =>
                setMentorQuestion(e.target.value)
              }
              placeholder="Example: How can I improve my chances of getting a software engineering placement?"
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />

            <button
              type="button"
              onClick={handleMentor}
              disabled={aiLoading.mentor}
              style={{
                marginTop: "12px",
              }}
            >
              {aiLoading.mentor
                ? "Thinking..."
                : "Ask Placement Mentor"}
            </button>


            {mentorResponse && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#f8f9fa",
                }}
              >

                <h3>
                  🤖 Placement Mentor
                </h3>

                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.7",
                  }}
                >
                  {mentorResponse}
                </div>

              </div>
            )}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;