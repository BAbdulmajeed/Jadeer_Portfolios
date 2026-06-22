import { Link } from "react-router-dom";

// Navigation bar component for navigating between pages.
export default function Navbar() {

  return (
    <nav className="navbar">

      <div className="logo">
        JADEER
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/browse">Browse</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="auth-buttons">

            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="signup-btn">
              Sign Up
            </Link>

      </div>

    </nav>
  );
}