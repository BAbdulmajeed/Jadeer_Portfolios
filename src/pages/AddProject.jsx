import { useNavigate } from "react-router-dom";

// Add Project page component for creating and publishing a new project.
export default function AddProject() {
  const navigate = useNavigate();

  return (
    <div className="portfolio-page">

      <div className="portfolio-card">

        <h1>Add New Project</h1>

        <p>
          Showcase your project and highlight your skills.
        </p>

        <form>

          <label>Project Title</label>
          <input
            type="text"
            placeholder="Enter project title"
          />

          <label>Short Description</label>
          <input
            type="text"
            placeholder="Short project summary"
          />

          <label>Detailed Description</label>
          <textarea
            rows="6"
            placeholder="Describe your project..."
          />

          <label>Technologies Used</label>
          <input
            type="text"
            placeholder="React, FastAPI, PostgreSQL..."
          />

          <label>GitHub Link</label>
          <input
            type="url"
            placeholder="https://github.com/..."
          />

          <label>Demo Link</label>
          <input
            type="url"
            placeholder="https://your-demo.com"
          />

          <label>Project Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
          />

          <button
            type="button"
            onClick={() => navigate("/project-details")}
          >
            Publish Project
          </button>

        </form>

      </div>

    </div>
  );
}