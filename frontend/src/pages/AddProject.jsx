import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { add_project } from "../api/projects";

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
  const handleProjectChange = (e) => {
    // Extracts the input's name and value from the event
    const { name, value } = e.target;

    // Then updates only the matching field in the project state
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  // Handles saving the project's information
  const handleSave = async (e) => {

    // prevents page from reloading after submiting page
    e.preventDefault();

    try {
      // call add_porject API and send the project's info
      const response = await add_project(id, project)
      navigate(`/project-details/${response.id}`)
    } catch (error) {
      // if an error occurs alert user
      alert("something went wrong")
      console.log(error.response?.data);
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
              onChange={handleProjectChange}
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
              onChange={handleProjectChange}
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
              onChange={handleProjectChange}
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
              onChange={handleProjectChange}
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
