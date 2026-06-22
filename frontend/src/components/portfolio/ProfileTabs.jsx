import { useState, useRef } from "react";
import ProjectsTab from "./tabs/ProjectsTab";
import Gallery from "../Gallery";
import { add_file, update_file, delete_file } from "../../api/files";
import { useNavigate } from "react-router-dom";

export default function ProfileTabs({ Projects, resume, certificates, canEdit, portfolioID, refresh }) {
  const [activeTab, setActiveTab] = useState("Projects");
  const resumeInputRef = useRef(null);

  // handle calling add file API endpoint and send resume file
  const handleResume = async (e) => {

    //Retrieve the file from the input event object
    const newFile = e.target.files[0]

    // Check if there is a resume, if false exit function
    if (!newFile) return;

    // Store file data and paramaters
    const file_data = {
      portfolio_id: portfolioID,
      file_purpose: "resume"
    };

    try {
      let response;

      // check if a resume already exits
      // if true call the update file API endpoint to update and replace the old resume with the new resume
      // if false call the add file endpoint to add resume
      if (resume !== null) {
        response = await update_file(resume.id, "resume", newFile)
      } else {
        response = await add_file(file_data, newFile)
      }
      refresh();
    } catch (error) {
      //alert user in a case of an error
      alert("something went wrong")
      console.log(error)
    }
  }

  // handle calling the delete API endpoint to delete resume
  const handleDeleteResume = async (resume_id) => {
    try {
      // call delete file API endpoint and pass the resume id
      await delete_file(resume_id);
      refresh();
    } catch (error) {
      // alert a user in case of an error
      alert("something went wrong")
      console.log(error)
    }
  }

const navigate = useNavigate();
  return (
  <div className="profile-tabs-container">
    <div className="tabs-header-wrapper">
      <button className={activeTab === "Projects" ? "tab-link active" : "tab-link"} onClick={() => setActiveTab("Projects")}>Projects</button>
      <button className={activeTab === "Resume" ? "tab-link active" : "tab-link"} onClick={() => setActiveTab("Resume")}>Resume</button>
      <button className={activeTab === "Certifications" ? "tab-link active" : "tab-link"} onClick={() => setActiveTab("Certifications")}>Certifications</button>
    </div>
{canEdit && activeTab === "Projects" && Projects.length > 0 && (
    <button
      className="add-project-btn-inside tab-header-action-btn"
      onClick={() => navigate(`/add-project/${portfolioID}`)} 

    >
      + Add New Project
    </button>
  )}
    <div>
      
      {(activeTab === "Projects") && (
        <ProjectsTab
          initialProjects={Projects}
          canEdit={canEdit}
          portfolioID={portfolioID}
          refresh={refresh} 
        />
      )}

      
      {(activeTab === "Resume") && (
        <div className="empty-tab-placeholder">
          <span>📄</span>
          <h3>Resume Upload</h3>
          <p>Upload your professional resume here to let employers download and view your career profile.</p>
          
          <input 
            type="file" 
            accept=".pdf,image/*" 
            ref={resumeInputRef} 
            className="hidden-file-input"
            onChange={handleResume} 
          />

          <div className="tab-actions-wrapper resume-actions-container">
            {canEdit && (
              <button className="add-project-btn-inside" onClick={() => resumeInputRef.current.click()}>
                {resume ? "Update Resume" : "+ Add Resume"}
              </button>
            )}

            {resume && (
              <>
                <a 
                  href={`http://localhost:8000/${resume.storage_path}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="add-project-btn-inside view-resume-link"
                >
                  View / Download
                </a>
                
                {canEdit && (
                  <button 
                    type="button" 
                    className="add-project-btn-inside delete-resume-btn"
                    onClick={() => handleDeleteResume(resume.id)}
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </div> 
        </div> 
      )} 

     
      {(activeTab === "Certifications") && (
        <div className="empty-tab-placeholder">
          <span>🏆</span>
          <h3>Certifications & Badges</h3>
          <p>Showcase your academic achievements, bootcamps, and verified professional certificates.</p>
          
          <div  className="tab-actions-wrapper certifications-gallery-container">
            <Gallery 
              initialFiles={certificates}
              canEdit={canEdit}
              purposeLabel="certificates"
              acceptFiles=".pdf,image/*"
              portfolioID={portfolioID}
              refresh={refresh} 
            />
          </div>
        </div>
      )} 

    </div> 

  </div> 
);
}