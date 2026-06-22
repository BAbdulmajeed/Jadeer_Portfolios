import { Link, useNavigate } from "react-router-dom";

// Navigation bar component for navigating between pages.
export default function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };


  return (
    <nav className="navbar">

      <div className="logo">
        JADEER
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="auth-buttons">

        {
          token ? <>

            <Link to="/my-portfolio" className="login-btn">
              My Portfolio
            </Link>

            <button
              onClick={logout}
              className="signup-btn"
            >
              Logout
            </button>
          </>
            : <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="signup-btn">
                Sign Up
              </Link>
            </>
        }

      </div>

    </nav>
  );
}