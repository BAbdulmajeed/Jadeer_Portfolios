import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UnauthorizedAccess() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        <h1>Unauthorized Access</h1>

        <div className="unauthorized-footer">
          <span>Already have an account?</span>

          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
