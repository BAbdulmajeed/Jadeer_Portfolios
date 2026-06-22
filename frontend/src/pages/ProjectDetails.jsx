import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { add_file, update_file } from "../api/files";
import { get_project, update_project, delete_project } from "../api/projects";
import ProfileHeader from "../components/portfolio/ProfileHeader";
import Gallery from "../components/Gallery";
import SkillsPanel from "../components/portfolio/sidebar/SkillsPanel";
import LinksPanel from "../components/portfolio/sidebar/LinksPanel";
import useInputChange from "../hooks/useInputChange";
import useFilesUpload from "../hooks/useFilesUpload";

export default function ProjectDetails({ canEdit }) {

  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({
    id: "",
    portfolio_id: "",
    title: "",
    short_description: "",
    full_description: "",
    is_published: false,
    project_date: "",
  });

  const [skills, setSkills] = useState([])
  const [files, setFiles] = useState([])
  const [projectImages, setProjectImages] = useState([])
  const [links, setLinks] = useState([])
  const edit = canEdit && <span>✎</span>;
  const coverInputRef = useRef(null);
  const [coverImage, setCoverImage] = useState(null);

  const levelMap = {
    1: "Beginner",
    3: "Competent",
    5: "Proficient",
  };

  // handles the publish switch button
  const switchPublishStatus = () => {
    const new_status = !project.is_published;
    setProject(prev => ({ ...prev, is_published: new_status }))
    alert("publication status changed, please save changes.")
  };


  // Handles updates for all project form inputs
  const handleChange = useInputChange();

  // Fetch project 
  const fetchProject = async () => {
    try {
      const data = await get_project(id)

      setProject({
        id: data.id || "",
        portfolio_id: data.portfolio_id || "",
        title: data.title || "",
        short_description: data.short_description || "",
        full_description: data.full_description || "",
        is_published: data.is_published || null,
        project_date: data.project_date || null,
      }
      )
      setSkills(data.skills || [])
      setFiles(data.files || [])
      setProjectImages(data.files?.filter(f => f.file_purpose === "project_images") || [])
      setLinks(data.external_links || [])

      // Search files for a project cover image
      const coverFile = data.files?.find(f => f.file_purpose === "project_cover");
      if (coverFile) setCoverImage(`http://localhost:8000/${coverFile.storage_path}`);

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  // handles file change API call
  const {
    handleFileChange
  } = useFilesUpload(
    files,
    project.portfolio_id,
    project.id,
    fetchProject
  );

  // handles the share button, when clicked copy the link to user's clipboard
  const handleShare = () => {
    const share_link = `http://localhost:5173/projects/${project.id}`;
    navigator.clipboard.writeText(share_link)
    alert("Link copied!")
  }

  // Handles saving the updated project's information
  const handleSaveProject = async (e) => {

    // prevents page from reloading after submiting page
    e.preventDefault()

    try {

      // call update_project API and send the updated project's info
      const response = await update_project(id, project)
      alert("changes saved!")
      setProject(project)

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  // execute fetchProject after component renders
  useEffect(() => { fetchProject(); }, [id, canEdit]);

  return (
    <div className="details-page">

      <input type="file" name="project_cover" accept="image/*" ref={coverInputRef} className="hidden-file-input" onChange={handleFileChange} disabled={!canEdit} />

      <ProfileHeader className="details-card" onSubmit={handleSaveProject}
        coverInputRef={coverInputRef}
        cover={coverImage}
        canEdit={canEdit}
      />

      <form className="details-card" onSubmit={handleSaveProject}>

        {/* 1. عنوان المشروع */}
        <label>
          Project Title
          <input
            required
            className="project-title" 
            type="text"
            name="title"
            value={project.title}
            onChange={(e) => handleChange(e, setProject)}
            disabled={!canEdit}
          />
        </label>

        {/* 2. تاريخ المشروع */}
        <label>
          Project Date
          <input
            required
            className="project-date" /* 💡 كلاس التنسيق */
            type="date"
            name="project_date"
            value={project.project_date || ""}
            onChange={(e) => handleChange(e, setProject)}
            disabled={!canEdit}
          />
        </label>

        {/* 3. الوصف المختصر */}
        {canEdit && (
          <label>
            Short Description
            <textarea
              required
              className="project-short-description" /* 💡 كلاس التنسيق */
              name="short_description"
              value={project.short_description}
              onChange={(e) => handleChange(e, setProject)}
              
            />
          </label>
        )}

        {/* 4. الوصف الكامل */}
        <label>
          Full Description
          <textarea
            required
            className="project-full-description" /* 💡 كلاس التنسيق */
            name="full_description"
            value={project.full_description}
            onChange={(e) => handleChange(e, setProject)}
            disabled={!canEdit}
          />
        </label>

        
          {canEdit && (
          <div  className="tab-actions-wrapper project-form-actions">
            <button className="publish-button" type="button" onClick={switchPublishStatus}>
              {project.is_published ? "Published" : "Unpublished"}
            </button>
            {project.is_published && (
              <button type="button" onClick={handleShare}>Share</button>
            )}
            <button type="submit" className="save-project-btn">Save</button>
          </div>
        )}
      </form>

      <SkillsPanel
        initialSkills={skills}
        portfolioID={project.portfolio_id}
        canEdit={canEdit}
        edit={edit}
        levelMap={levelMap}
        refresh={fetchProject}
        projectID={project.id}
      />

      <LinksPanel
        initialLinks={links}
        portfolioID={project.portfolio_id}
        canEdit={canEdit}
        edit={edit}
        levelMap={levelMap}
        refresh={fetchProject}
        projectID={project.id}
      />

<div className="gallery-section-wrapper project-gallery-section">
  <h3 className="section-title-label">GALLERY</h3>
      <div className="gallery-container-box">
      <Gallery initialFiles={projectImages}
        canEdit={canEdit}
        purposeLabel="project_images"
        acceptFiles="image/*"
        portfolioID={project.portfolio_id}
        projectID={id}
        refresh={fetchProject} />
      </div>
      </div>
    </div>
  );
}