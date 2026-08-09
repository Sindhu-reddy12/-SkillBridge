import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    email:"",
    fullName: "",
    phone: "",
    college: "",
    branch: "",
    semester: "",
    cgpa: "",
    careerGoal: "",
    skills: "",
    programmingLanguages: "",
    projects: "",
    internship: "",
    codingPlatform: "",
    codingProfile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Student Profile:", profile);

    navigate("/dashboard");
  };

  return (
    <div className="profile-page">

      {/* Navigation */}
      <Navbar />

      <div className="profile-card">

        <h1>Complete Your Profile 👤</h1>

        <p>
          Tell us about yourself so AI-Powered Placement Readiness PLatform can personalize your
          placement journey.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Personal Details */}
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

          {/* Education */}
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

          {/* Career Details */}
          <h2>Career Details</h2>

          <label>Career Goal</label>
          <select
            name="careerGoal"
            value={profile.careerGoal}
            onChange={handleChange}
            required
          >
            <option value="">Select career goal</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="Web Developer">Web Developer</option>
          </select>

          <label>Skills</label>
          <textarea
            name="skills"
            placeholder="e.g. Python, SQL, Machine Learning"
            value={profile.skills}
            onChange={handleChange}
          />

          <label>Programming Languages</label>
          <input
            type="text"
            name="programmingLanguages"
            placeholder="e.g. Python, Java, C++"
            value={profile.programmingLanguages}
            onChange={handleChange}
          />

          {/* Projects & Experience */}
          <h2>Projects & Experience</h2>

          <label>Projects</label>
          <textarea
            name="projects"
            placeholder="Tell us about your projects"
            value={profile.projects}
            onChange={handleChange}
          />

          <label>Internship Details</label>
          <textarea
            name="internship"
            placeholder="Enter internship details (if any)"
            value={profile.internship}
            onChange={handleChange}
          />

          {/* Coding Profile */}
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
            <option value="GeeksforGeeks">GeeksforGeeks</option>
          </select>

          <label>Coding Profile Link</label>
          <input
            type="url"
            name="codingProfile"
            placeholder="Paste your coding profile link"
            value={profile.codingProfile}
            onChange={handleChange}
          />

          <button type="submit">
            Save Profile & Continue →
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;