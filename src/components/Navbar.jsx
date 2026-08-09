import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <Link to="/dashboard" className="navbar-logo">
        AI-Powered Placement Readiness PLatform
      </Link>

      <div className="navbar-links">

        <Link to="/dashboard">
          🏠 Dashboard
        </Link>

        <Link to="/profile">
          👤 Profile
        </Link>

        <button onClick={() => navigate("/login")}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;