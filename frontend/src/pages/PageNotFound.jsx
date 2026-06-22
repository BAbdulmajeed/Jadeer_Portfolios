import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">

      <div className="auth-card">


        <h1>404</h1>

        <p>
          Page Not Found
        </p>


        <div className="auth-footer">
          <Link to="/">
            back to home page
          </Link>
        </div>

      </div>

    </div>
  );
}