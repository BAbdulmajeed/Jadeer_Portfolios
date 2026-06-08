import { Link, useNavigate } from "react-router-dom";
// Register page component for creating a new user account.
export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">

      <div className="auth-card">

        <span className="auth-badge">
          JOIN US TODAY
        </span>

        <h1>Create Account.</h1>

        <p>
          Start building your portfolio
        </p>

        <form>

          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
          />

          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
          />

          <button
            type="button"
            onClick={() => navigate("/create-portfolio")}
          >
            Create Account →
          </button>

        </form>

        <div className="auth-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}