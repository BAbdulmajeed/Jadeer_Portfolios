import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="pageNotFound-page">
      <div className="pageNotFound-card">
        <h1>404</h1>

        <p>Page Not Found</p>

        <div className="pageNotFound-footer">
          <Link to="/">back to home page</Link>
        </div>
      </div>
    </div>
  );
}
