import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    email: "",
    fullName: "",
    phone: "",
    college: "",
    branch: "",
    semester: "",
    cgpa: "",

    careerGoal: "",
    skills: "",
    programmingLanguages: "",
    skillsCount: "",

    projects: "",
    projectsCount: "",
    internship: "",
    internshipDetails: "",

    codingPlatform: "",
    codingProfileLink: "",
    codingProfile: "",

    aptitudeScore: "",
    communicationScore: "",
    resumeScore: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const mlData = {
      CGPA: Number(profile.cgpa),
      Semester: Number(profile.semester),
      Skills_Count: Number(profile.skillsCount),
      Projects_Count: Number(profile.projectsCount),
      Internship: Number(profile.internship),
      Coding_Profile: Number(profile.codingProfile),
      Aptitude_Score: Number(profile.aptitudeScore),
      Communication_Score: Number(profile.communicationScore),
      Resume_Score: Number(profile.resumeScore),
    };

    console.log("ML INPUT:", mlData);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mlData),
        }
      );

      if (!response.ok) {
        throw new Error("ML API request failed");
      }

      const result = await response.json();

console.log("ML RESULT:", result);

// Save the complete student profile
localStorage.setItem(
  "studentProfile",
  JSON.stringify(profile)
);

// Save the ML readiness score
localStorage.setItem(
  "placementReadiness",
  String(result.placement_readiness)
);

// Save the exact AI profile that the FastAPI AI endpoints expect
const aiProfile = {
  fullName: profile.fullName,
  email: profile.email,
  college: profile.college,
  branch: profile.branch,
  semester: Number(profile.semester),
  cgpa: Number(profile.cgpa),

  careerGoal: profile.careerGoal,
  skills: profile.skills,
  programmingLanguages: profile.programmingLanguages,

  projects: profile.projects,
  internship: String(profile.internship),
  codingPlatform: profile.codingPlatform,
  codingProfile: String(profile.codingProfile),

  skillsCount: Number(profile.skillsCount),
  projectsCount: Number(profile.projectsCount),

  aptitudeScore: Number(profile.aptitudeScore),
  communicationScore: Number(profile.communicationScore),
  resumeScore: Number(profile.resumeScore),

  placementReadiness: Number(result.placement_readiness),
};

localStorage.setItem(
  "aiStudentProfile",
  JSON.stringify(aiProfile)
);
      localStorage.setItem(
        "studentName",
        profile.fullName
      );

      localStorage.setItem(
        "placementReadiness",
        result.placement_readiness
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        "Could not connect to the ML API. Please make sure the FastAPI server is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="profile-card">

        <h1>Complete Your Profile 👤</h1>

        <p>
          Tell us about yourself so AI-Powered Placement Readiness
          Platform can personalize your placement journey.
        </p>

        {error && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* ================= PERSONAL DETAILS ================= */}

          <h2>Personal Details</h2>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={profile.fullName}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={profile.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={profile.phone}
            onChange={handleChange}
          />

          {/* ================= EDUCATION ================= */}

          <h2>Education</h2>

          <label>College</label>
          <input
            type="text"
            name="college"
            placeholder="Enter your college name"
            value={profile.college}
            onChange={handleChange}
            required
          />

          <label>Branch</label>
          <input
            type="text"
            name="branch"
            placeholder="e.g. Data Science"
            value={profile.branch}
            onChange={handleChange}
            required
          />

          <label>Semester</label>
          <select
            name="semester"
            value={profile.semester}
            onChange={handleChange}
            required
          >
            <option value="">Select semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
            <option value="7">7th Semester</option>
            <option value="8">8th Semester</option>
          </select>

          <label>CGPA</label>
          <input
            type="number"
            name="cgpa"
            placeholder="Enter your CGPA"
            min="0"
            max="10"
            step="0.01"
            value={profile.cgpa}
            onChange={handleChange}
            required
          />

          {/* ================= CAREER DETAILS ================= */}

          <h2>Career Details</h2>

          <label>Career Goal</label>
          <select
            name="careerGoal"
            value={profile.careerGoal}
            onChange={handleChange}
            required
          >
            <option value="">Select career goal</option>
            <option value="Software Engineer">
              Software Engineer
            </option>
            <option value="Data Analyst">
              Data Analyst
            </option>
            <option value="Data Scientist">
              Data Scientist
            </option>
            <option value="AI Engineer">
              AI Engineer
            </option>
            <option value="Web Developer">
              Web Developer
            </option>
          </select>

          <label>Skills</label>
          <textarea
            name="skills"
            placeholder="e.g. Python, SQL, Machine Learning"
            value={profile.skills}
            onChange={handleChange}
          />

          {/* ML FEATURE */}
          <label>Number of Skills</label>
          <input
            type="number"
            name="skillsCount"
            placeholder="e.g. 7"
            min="0"
            step="1"
            value={profile.skillsCount}
            onChange={handleChange}
            required
          />

          <label>Programming Languages</label>
          <input
            type="text"
            name="programmingLanguages"
            placeholder="e.g. Python, Java, C++"
            value={profile.programmingLanguages}
            onChange={handleChange}
          />

          {/* ================= ASSESSMENT SCORES ================= */}

          <h2>Assessment Scores</h2>

          <label>Aptitude Score</label>
          <input
            type="number"
            name="aptitudeScore"
            placeholder="Enter aptitude score"
            min="0"
            max="100"
            step="0.01"
            value={profile.aptitudeScore}
            onChange={handleChange}
            required
          />

          <label>Communication Score</label>
          <input
            type="number"
            name="communicationScore"
            placeholder="Enter communication score"
            min="0"
            max="100"
            step="0.01"
            value={profile.communicationScore}
            onChange={handleChange}
            required
          />

          <label>Resume Score</label>
          <input
            type="number"
            name="resumeScore"
            placeholder="Enter resume score"
            min="0"
            max="100"
            step="0.01"
            value={profile.resumeScore}
            onChange={handleChange}
            required
          />

          {/* ================= PROJECTS & EXPERIENCE ================= */}

          <h2>Projects & Experience</h2>

          <label>Projects</label>
          <textarea
            name="projects"
            placeholder="Tell us about your projects"
            value={profile.projects}
            onChange={handleChange}
          />

          {/* ML FEATURE */}
          <label>Number of Projects</label>
          <input
            type="number"
            name="projectsCount"
            placeholder="e.g. 3"
            min="0"
            step="1"
            value={profile.projectsCount}
            onChange={handleChange}
            required
          />

          {/* ML FEATURE */}
          <label>Number of Internships</label>
          <input
            type="number"
            name="internship"
            placeholder="Enter number of internships"
            min="0"
            step="1"
            value={profile.internship}
            onChange={handleChange}
            required
          />

          {/* Profile information — not sent as ML input */}
          <label>Internship Details</label>
          <textarea
            name="internshipDetails"
            placeholder="Enter internship details"
            value={profile.internshipDetails}
            onChange={handleChange}
          />

          {/* ================= CODING PROFILE ================= */}

          <h2>Coding Profile</h2>

          <label>Preferred Coding Platform</label>
          <select
            name="codingPlatform"
            value={profile.codingPlatform}
            onChange={handleChange}
          >
            <option value="">Select platform</option>
            <option value="LeetCode">LeetCode</option>
            <option value="HackerRank">HackerRank</option>
            <option value="CodeChef">CodeChef</option>
            <option value="Codeforces">Codeforces</option>
            <option value="GeeksforGeeks">
              GeeksforGeeks
            </option>
          </select>

          <label>Coding Profile Link</label>
          <input
            type="url"
            name="codingProfileLink"
            placeholder="Paste your coding profile link"
            value={profile.codingProfileLink}
            onChange={handleChange}
          />

          {/* ML FEATURE */}
          <label>Coding Profile Score</label>
          <input
            type="number"
            name="codingProfile"
            placeholder="Enter coding profile score"
            min="0"
            max="10"
            step="1"
            value={profile.codingProfile}
            onChange={handleChange}
            required
          />

          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Calculating Placement Readiness..."
              : "Save Profile & Continue →"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Profile;