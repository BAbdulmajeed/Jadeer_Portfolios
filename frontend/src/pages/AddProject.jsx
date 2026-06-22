import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { add_project } from "../api/projects";
import useInputChange from "../hooks/useInputChange";

// Add Project page component for creating and publishing a new project.
export default function AddProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({
    title: "",
    short_description: "",
    full_description: "",
    project_date: null,
  });

  // Handles updates for all project form inputs
  const handleChange = useInputChange();

  // Handles saving the project's information
  const handleSave = async (e) => {

    // prevents page from reloading after submiting page
    e.preventDefault();

    try {
      // call add_porject API and send the project's info
      const response = await add_project(id, project)
      navigate(`/project-details/${response.id}`)
    } catch (error) {
      console.error(error.response?.data || error.message);
    }

  }

  return (
    <div className="portfolio-page">
      <div className="portfolio-card">
        <h1>Add New Project</h1>

        <p>Showcase your project and highlight your skills.</p>

        <form onSubmit={handleSave}>

          {/* Project Title */}
          <label>
            Project Title
            <input
              required
              className="project-title"
              type="text"
              name="title"
              value={project.title}
              onChange={(e) => handleChange(e, setProject)}
              placeholder="Enter your project title"
            />
          </label>

          {/* Short Description */}
          <label>
            Short Description
            <textarea
              className="project-short-description"
              name="short_description"
              value={project.short_description}
              onChange={(e) => handleChange(e, setProject)}
              placeholder="Enter a short description of your project"
            />
          </label>

          {/* Full Description*/}
          <label>
            Full Description
            <textarea
              className="project-full-description"
              name="full_description"
              value={project.full_description}
              onChange={(e) => handleChange(e, setProject)}
              placeholder="Enter your full project description"
            />
          </label>

          {/* Project Date */}
          <label>
            Project Date
            <input
              className="project-date"
              type="date"
              name="project_date"
              value={project.project_date}
              onChange={(e) => handleChange(e, setProject)}
            />
          </label>

          <button type="submit">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
