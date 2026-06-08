import { useNavigate } from "react-router-dom";
// Create Portfolio page component for building a student's professional portfolio.
export default function CreatePortfolio() {
  const navigate = useNavigate();

  return (
    <div className="portfolio-page">
      <div className="portfolio-card">

        <h1>Create Your Portfolio</h1>

        <p>
          Complete your profile and showcase your skills,
          achievements, and projects.
        </p>

        <form>

          <label>Profile Picture</label>
          <input type="file" accept="image/*" />

          <label>CV (PDF)</label>
          <input type="file" accept=".pdf" />

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />

          <label>University</label>
          <input
            type="text"
            placeholder="Enter university name"
          />

          <label>Major</label>
          <input
            type="text"
            placeholder="Enter your major"
          />

          <label>Skills</label>
          <input
            type="text"
            placeholder="React, HTML, CSS, JavaScript..."
          />

          <label>About Me</label>
          <textarea
            rows="5"
            placeholder="Tell recruiters about yourself..."
          />

          <label>LinkedIn Profile</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/username"
          />

          <label>GitHub Profile</label>
          <input
            type="url"
            placeholder="https://github.com/username"
          />

          <label>Project Gallery Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
          />

          <button
            type="button"
            onClick={() => navigate("/my-projects")}
          >
            Save Portfolio
          </button>

        </form>

      </div>
    </div>
  );
}