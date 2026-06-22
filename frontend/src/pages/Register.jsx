import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../api/auth";
// Register page component for creating a new user account.
export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false);

  // handle calling the login API
  const handleRegister = async (e) => {
   
    e.preventDefault();

    //check if both passwords match, 
    // if false alert user
    // if true send request to the backend
    if (password != confirmPassword) {
      setPasswordFailed(true)
    } else {
      try {
        
        // call register api endpoint
        const data = await register(name, email, password);

        // store tokens
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        setRegistrationFailed(false)
        setPasswordFailed(false)

        // direct user to their portfolio page
        navigate("/my-portfolio")

      } catch (error) {
        setRegistrationFailed(true)
        console.error(error.response?.data || error.message);
      }
    }
  };

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

        <div>
          {registrationFailed && <p className="login-error"> Registration failed </p>}
        </div>

        <div>
          {passwordFailed && <p className="login-error"> Password does not match </p>}
        </div>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter first name"
          />

          <label>Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
          />

          <label>Confirm Password</label>
          <input
            required
            type="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />

          <button
            type="submit"
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