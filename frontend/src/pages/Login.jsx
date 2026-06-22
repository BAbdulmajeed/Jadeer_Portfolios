import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/auth";

// Login page component for user authentication and account access.
export default function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  // Handles the login API call to log user in
  const handleLogin = async () => {
    try {
      // call login API and send then user's info
      const data = await login(email, password);

      // store the user's tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // direct the user to their portfolio page
      navigate("/my-portfolio");
    } catch (err) {
      // if an error occurs alert user
      setLoginFailed(true);
      console.error("Login failed:", err.response?.data || err.message);
    }
  };


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

        <div>
          {loginFailed && <p className="login-error"> Email or Password is incorrect</p>}
        </div>

        <form>

          <label>Email</label>

          <input
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            required
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={handleLogin}
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
