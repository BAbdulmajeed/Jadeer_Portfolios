import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-not-found-page">

      <div className="page-not-found-card">

        <h1>404</h1>
        <h2> Page Not Found </h2>

        <div className="page-not-found-footer">
          <Link to="/">
            back to home page
          </Link>
        </div>

      </div>

    </div>
  );
}