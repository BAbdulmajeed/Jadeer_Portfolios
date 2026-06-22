import { useState, useRef } from "react";
import ProjectsTab from "./tabs/ProjectsTab";
import Gallery from "../Gallery";
import { add_file, update_file, delete_file } from "../../api/files";
import { useNavigate } from "react-router-dom";
import useFilesUpload from "../../hooks/useFilesUpload";
import useFileDelete from "../../hooks/useFileDelete";

export default function ProfileTabs({
  Projects,
  initialFiles,
  resume,
  canEdit,
  portfolioID,
  refresh,
}) {
  const [activeTab, setActiveTab] = useState("Projects");
  const resumeInputRef = useRef(null);

  const { handleFileChange } = useFilesUpload(
    initialFiles,
    portfolioID,
    null,
    refresh,
  );

  const { handleDelete } = useFileDelete(refresh);

  return (
    <div className="profile-tabs-container">
      <div className="tabs-header-wrapper">
        <button
          className={activeTab === "Projects" ? "tab-link active" : "tab-link"}
          onClick={() => setActiveTab("Projects")}
        >
          Projects
        </button>
        <button
          className={activeTab === "Resume" ? "tab-link active" : "tab-link"}
          onClick={() => setActiveTab("Resume")}
        >
          Resume
        </button>
        <button
          className={
            activeTab === "Certifications" ? "tab-link active" : "tab-link"
          }
          onClick={() => setActiveTab("Certifications")}
        >
          Certifications
        </button>
      </div>

      <div>
        {activeTab === "Projects" && (
          <ProjectsTab
            initialProjects={Projects}
            canEdit={canEdit}
            portfolioID={portfolioID}
            refresh={refresh}
          />
        )}

        {activeTab === "Resume" && (
          <div className="empty-tab-placeholder">
            <input
              type="file"
              name="resume"
              accept=".pdf,image/*"
              ref={resumeInputRef}
              className="hidden-file-input"
              onChange={handleFileChange}
            />

            {resume && (
              <>
                <div>
                  <a
                    href={`http://localhost:8000/${resume.storage_path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="add-project-btn-inside view-resume-link"
                  >
                    Download
                  </a>

                  {canEdit && (
                    <>
                      <button
                        className="add-project-btn-inside update-resume-btn"
                        onClick={() => resumeInputRef.current.click()}
                      >
                        {resume ? "Update Resume" : "+ Add Resume"}
                      </button>
                      <button
                        type="button"
                        className="add-project-btn-inside delete-resume-btn"
                        onClick={() => handleDelete(resume.id)}
                      >
                        Delete
                      </button>{" "}
                    </>
                  )}
                </div>

                <iframe
                  src={`http://localhost:8000/${resume.storage_path}#toolbar=0`}
                  className="gallery-media-iframe"
                  title="PDF preview"
                />
              </>
            )}
            <div className="tab-actions-wrapper resume-actions-container">
              {canEdit && resume == null && (
                <div>
                  <span>📄</span>
                  <h3>Resume Upload</h3>
                  <p>
                    Upload your professional resume here to let employers
                    download and view your career profile.
                  </p>
                  <button
                    className="add-project-btn-inside"
                    onClick={() => resumeInputRef.current.click()}
                  >
                    {resume ? "Update Resume" : "+ Add Resume"}
                  </button>{" "}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "Certifications" && (
          <div className="empty-tab-placeholder">
            {initialFiles.some(
              (file) => file.file_purpose === "certificates",
            ) ? null : (
              <>
                <span>🏆</span>
                <h3>Certifications & Badges</h3>
                <p>
                  Showcase your academic achievements, bootcamps, and verified
                  professional certificates.
                </p>
              </>
            )}

            <div className="tab-actions-wrapper certifications-gallery-container">
              <Gallery
                initialFiles={initialFiles.filter(
                  (file) => file.file_purpose === "certificates",
                )}
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
