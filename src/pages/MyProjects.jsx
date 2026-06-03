import { useNavigate } from "react-router-dom";
// My Projects page component for managing and viewing user projects.
export default function MyProjects() {
  const navigate = useNavigate();

  return (
    <div className="projects-page">

      <div className="projects-header">

        <div>
          <h1>My Projects</h1>
          <p>Manage and showcase your projects.</p>
        </div>

        <button
          className="add-project-btn"
          onClick={() => navigate("/add-project")}
        >
          + Add New Project
        </button>

      </div>

      <div className="project-grid">

        <div className="project-box">

          <img
            src="https://via.placeholder.com/400x220"
            alt="Portfolio Website"
          />

          <h3>Portfolio Website</h3>

          <p>
            Personal portfolio built using React and CSS.
          </p>

          <div className="project-actions">

            <button
              className="view-btn"
              onClick={() => navigate("/project-details")}
            >
              View
            </button>

            <button className="edit-btn">
              Edit
            </button>

            <button className="delete-btn">
              Delete
            </button>

          </div>

        </div>

        <div className="project-box">

          <img
            src="https://via.placeholder.com/400x220"
            alt="E-Commerce App"
          />

          <h3>E-Commerce App</h3>

          <p>
            Online shopping platform with product management.
          </p>

          <div className="project-actions">

            <button
              className="view-btn"
              onClick={() => navigate("/project-details")}
            >
              View
            </button>

            <button className="edit-btn">
              Edit
            </button>

            <button className="delete-btn">
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}