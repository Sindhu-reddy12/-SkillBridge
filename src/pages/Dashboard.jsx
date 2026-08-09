import { useState } from "react";
import Navbar from "../components/Navbar";


function Dashboard() {
  const[studentName]=useState(localStorage.getItem("studentName")||"Student"
  );
  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard-content">

        {/* Welcome Section */}
        <section className="welcome-section">
          <h1>Welcome back, {studentName}!</h1>

          <p>
            Here's your placement readiness overview.
          </p>
        </section>

        {/* Main Readiness Score */}
        <section className="readiness-card">

          <div>
            <p className="card-label">Placement Readiness</p>

            <h2>82%</h2>

            <p>
              You're on a great path! Keep improving your skills.
            </p>
          </div>

          <div className="readiness-circle">
            82%
          </div>

        </section>

        {/* Score Cards */}
        <section className="score-grid">

          <div className="score-card">
            <span>📄</span>
            <h3>Resume Score</h3>
            <strong>78%</strong>
            <p>Resume quality</p>
          </div>

          <div className="score-card">
            <span>💻</span>
            <h3>Coding Score</h3>
            <strong>85%</strong>
            <p>Coding performance</p>
          </div>

          <div className="score-card">
            <span>📝</span>
            <h3>Aptitude Score</h3>
            <strong>74%</strong>
            <p>Latest assessment</p>
          </div>

          <div className="score-card">
            <span>🗣️</span>
            <h3>Communication</h3>
            <strong>80%</strong>
            <p>Communication skills</p>
          </div>

        </section>

        {/* Bottom Sections */}
        <section className="dashboard-grid">

          {/* Skill Progress */}
          <div className="dashboard-card">

            <h2>Skill Progress 📈</h2>

            <div className="skill">
              <div>
                <span>Python</span>
                <span>90%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div>
                <span>SQL</span>
                <span>75%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div>
                <span>React</span>
                <span>60%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

          </div>

          {/* AI Recommendations */}
          <div className="dashboard-card">

            <h2>AI Recommendations 🤖</h2>

            <ul className="recommendations">

              <li>
                Improve your SQL skills
              </li>

              <li>
                Practice more DSA problems
              </li>

              <li>
                Build one strong data science project
              </li>

              <li>
                Take another aptitude assessment
              </li>

            </ul>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;