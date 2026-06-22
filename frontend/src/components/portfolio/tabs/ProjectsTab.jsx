import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { delete_project } from "../../../api/projects";


export default function ProjectsTab({ initialProjects, canEdit, portfolioID, refresh }) {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([])

 // Reset files and index whenever initialProjects changes
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  //handle calling the delete project API endpoint to delete project
  const handleDeleteProject = async (project_id) => {
    try {
      // call delete project API endpoint and pass the project id
      await delete_project(project_id)
      refresh()
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

return (
    <div className="projects-tab-content">
      <div className="projects-display-wrapper">
        {projects.length === 0 ? (
          <div className="empty-tab-placeholder">
            <span>📁</span>
            <h3>No Projects Added Yet</h3>
            <p>Your profile looks a bit empty. Click the button below to showcase your first project!</p>

            {canEdit && (
              <button
                className="add-project-btn-inside"
                onClick={() => navigate(`/add-project/${portfolioID}`)}
              >
                + Add New Project
              </button>
            )}
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => {
              const coverFile = project.files?.find(f => f.file_purpose === "project_cover");
              const coverUrl = coverFile ? `http://localhost:8000/${coverFile.storage_path}` : null;
              return(
              <div className="project-box" key={project.id}>
                <div className="project-card-thumbnail">
                {coverUrl ? (
                  <img src={coverUrl} alt={project.title} />
                  ) : (
                <div className="no-cover-placeholder">📸 No Cover Image</div>
                )}
              </div>
                <h3>{project.title}</h3>
                <p>{project.short_description}</p>
                
                <div className="project-actions">
                  <button 
                    className="view-btn" 
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View
                  </button>
                  {canEdit && (
                   <>
                  <button className="edit-btn" onClick={() => navigate(`/project-details/${project.id}`)}>Edit</button>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
    })}
          </div>
        )}
      </div>
    </div>
  );
}