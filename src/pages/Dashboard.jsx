import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [profile, setProfile] = useState({});
  const [readiness, setReadiness] = useState(0);

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

  // ML model uses Coding_Profile on a 0-10 scale.
  // Dashboard displays it as percentage.
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

          {/* Coding Profile */}

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

      </main>
    </div>
  );
}

export default Dashboard;