import { Link, useNavigate } from "react-router-dom";
// Login page component for user authentication and account access.
export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">

      <div className="auth-card">

        <span className="auth-badge">
          PORTFOLIO PLATFORM
        </span>

        <h1>Welcome Back.</h1>

        <p>
          Sign in to your account to continue
        </p>

        <form>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button
            type="button"
            onClick={() => navigate("/create-portfolio")}
          >
            Sign In →
          </button>

        </form>

        <div className="auth-footer">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}
