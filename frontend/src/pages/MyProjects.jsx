import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProjects() {
  const navigate = useNavigate();
  
 const [activeTab, setActiveTab] = useState("Projects");

  
  const [name, setName] = useState("Full Name");
  const [location, setLocation] = useState("Location");
  const [about, setAbout] = useState("Add a brief description about yourself...");
  const [role, setRole] = useState("Role Title");
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [certFile, setCertFile] = useState(null);


  const [skills, setSkills] = useState([]);

  const [projects, setProjects] = useState([]);
 
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const certInputRef = useRef(null);
  // دالات تعديل بيانات الملف الشخصي
  const handleEditName = () => { const n = prompt("Enter name:", name); if (n) setName(n); };
  const handleEditLocation = () => { const l = prompt("Enter location:", location); if(l) setLocation(l); };
  const handleEditAbout = () => { const a = prompt("Enter about:", about); if (a) setAbout(a); };
  const handleEditRole = () => { const r = prompt("Enter role:", role); if (r) setRole(r); };
  // دالات المهارات
  const handleAddSkill = () => {
    const n = prompt("Skill name:");
    if (n) { 
      const l = prompt("Level:", "Beginner"); 
      setSkills([...skills, { id: Date.now(), name:n, level: l}]);
    }
  };

  const handleEditSkill = (id, cn, cl) => {
    const n = prompt("Edit name:", cn);
    if (n) {
      const l = prompt("Edit level:", cl);
      setSkills(skills.map(s => s.id === id ? { ...s, name: n, level: l} : s)); 
    }
  };

  const handleDeleteSkill = (id) => { 
    if (confirm("Are you sure you want to delete this skill?")) setSkills(skills.filter(s => s.id !== id));
  };

  // 5️⃣ 👇 دالات التحكم بالمشاريع (تعديل وحذف) 👇
  // دالة تعديل المشروع
  const handleEditProject = (id, currentTitle, currentDescription) => {
    const newTitle = prompt("Edit the project title:", currentTitle);
    if (newTitle && newTitle.trim() !== "") {
      const newDescription = prompt("Edit the project description:", currentDescription);
      
      // تحديث بيانات المشروع المحدد داخل الـ State
      setProjects(projects.map(project => 
        project.id === id ? { ...project, title: newTitle, description: newDescription } : project
      ));
    }
  };

  // دالة حذف المشروع
  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      // إزالة المشروع من المصفوفة لتحديث الشاشة فوراً
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  // دالة لتغيير صورة مشروع معين بناءً على الـ id
const handleProjectImageChange = (id, e) => {
  if (e.target.files && e.target.files[0]) {
    const newImageURL = URL.createObjectURL(e.target.files[0]); // تحويل الصورة لرابط مؤقت
    
    // تحديث صورة المشروع المحدد فقط في الـ State
    setProjects(projects.map(project => 
      project.id === id ? { ...project, image: newImageURL } : project
    ));
  }
};

  // دالات رفع الملفات
  const handleAvatarChange = (e) => { if (e.target.files[0]) setAvatar(URL.createObjectURL(e.target.files[0])); };
  const handleCoverChange = (e) => { if (e.target.files[0]) setCover(URL.createObjectURL(e.target.files[0])); };
  const handleResumeChange = (e) => { if (e.target.files[0]) setResumeFile(e.target.files[0]); };
  const handleCertChange = (e) => { if (e.target.files[0]) setCertFile(e.target.files[0]); };
  
  return (
    <div className="profile-page-container">
        <input type="file" accept="image/*" ref={avatarInputRef} style={{ display: 'none' }} onChange={handleAvatarChange} />
        <input type="file" accept="image/*" ref={coverInputRef} style={{ display: 'none' }} onChange={handleCoverChange} />
        <input type="file" accept=".pdf,image/*" ref={certInputRef} style={{ display: 'none' }} onChange={handleCertChange} />
        
        {/* العمود الجانبي */}
        <aside className="profile-sidebar">
          <div className="avatar-container-center">
            <button className="edit-avatar-btn" onClick={() => avatarInputRef.current.click()}>
              {avatar ? <img src={avatar} alt="Avatar" style= {{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : <div className="profile-avatar-placeholder">👤</div>}
              <span className="edit-overlay-text">Edit</span>
            </button>
          </div>
          <button className="editable-text-btn profile-name" onClick={handleEditName}>{name} <span>✎</span></button>
          <button className="editable-text-btn profile-location" onClick={handleEditLocation}>📍 {location} <span>✎</span></button>

        <div className="profile-section-block">
           <button className="section-edit-trigger" onClick={handleEditAbout}><h3>About <span>✎</span></h3></button>
           <p>{about}</p>
        </div>

        <div className="profile-section-block">
          <button className="section-edit-trigger" onClick={handleEditRole}><h3>Role <span>✎</span></h3></button>
          <p className="profile-role-title">{role}</p>
        </div>

        <div className="profile-section-block">
          <button className="section-edit-trigger" onClick={handleAddSkill}><h3>skills <span>➕ Add</span></h3></button>
         {skills.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic', margin: '10px 0 0 0', textAlign: 'center', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
           No skills added yet. Click ➕ Add above to showcase your expertise!
          </p>
             ) : (
          <ul className="profile-skills-list">
            {skills.map(s => (
          <li key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '10px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>{s.name}</span> <span className="skill-level">{s.level}</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => handleEditSkill(s.id, s.name, s.level)} style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', fontSize: '12px', padding: 0 }}>⚙️ Edit</button>
          <button onClick={() => handleDeleteSkill(s.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', padding: 0 }}>❌ Delete</button>
        </div>
         </li>
          ))}
          </ul>
          )}
        </div>
      </aside>

      {/* القسم الرئيسي */}
      <main className="profile-main-content">
        <button className="profile-cover-banner-btn" onClick={() => coverInputRef.current.click()} style={cover ? { backgroundImage: `url(${cover})`, backgroundSize: 'cover' } : {}}>
          <div className="cover-inner-content">
            <span style={{ background: 'rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '5px', fontSize: '13px' }}>📷 Change Cover Photo</span>
            <button className="share-profile-btn" onClick={(e) => { e.stopPropagation(); alert("Link copied!"); }}>🔗 share</button>
          </div>
        </button>

        <div className="profile-tabs-nav">
          <div className="tabs-links">
            <button className={activeTab === "Projects" ? "tab-link active" : "tab-link"} onClick={() => setActiveTab("Projects")}>Projects</button>
            <button className={activeTab === "Resume" ? "tab-link active" : "tab-link"} onClick={() => setActiveTab("Resume")}>Resume</button>
            <button className={activeTab === "Certifications" ? "tab-link active" : "tab-link"} onClick={() => setActiveTab("Certifications")}>Certifications</button>
          </div>
          <button className="add-project-btn" onClick={() => navigate("/add-project")}>+ Add New Project</button>
        </div>

        <div className="tab-content-area">
          {/* عرض المشاريع ديناميكياً بناءً على الـ State المحدثة */}
          {activeTab === "Projects" && (
              <div>
                {projects.length === 0 ? (
                  <div className="empty-tab-placeholder" style={{ padding: '60px 20px', textAlign: 'center', background: '#f8fafc', borderRadius: '15px', border: '1px dashed #cbd5e1', marginTop: '20px' }}>
                    <span style={{ fontSize: '40px' }}>📁</span>
                    <h3 style={{ marginTop: '15px', color: '#334155' }}>No Projects Added Yet</h3>
                    <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0 20px 0' }}>Your profile looks a bit empty. Click the button below to showcase your first project!</p>
                    <button className="share-profile-btn" onClick={() => navigate("/add-project")} style={{ background: '#2563eb', color: 'white', border: 'none' }}>＋ Add Your First Project</button>
                  </div>
                ) : (
                  <div className="project-grid">
                    {projects.map((project) => (
                      <div className="project-box" key={project.id}>
                        <div className="project-image-wrapper" style={{ position: 'relative', cursor: 'pointer' }} title="Click to change image">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '10px', marginBottom: '12px' }}
                            onClick={() => document.getElementById(`project-file-${project.id}`).click()} 
                          />
                          <input 
                            type="file" 
                            accept="image/*" 
                            id={`project-file-${project.id}`} 
                            style={{ display: 'none' }} 
                            onChange={(e) => handleProjectImageChange(project.id, e)} 
                          />
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="project-actions">
                          <button className="view-btn" onClick={() => navigate("/project-details")}>View</button>
                          <button className="edit-btn" onClick={() => handleEditProject(project.id, project.title, project.description)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          
          {activeTab === "Resume" && (
            <div className="empty-tab-placeholder">
              <h3>📄 My Resume</h3>
              <input type="file" accept=".pdf" ref={resumeInputRef} style={{ display: 'none' }} onChange={handleResumeChange} />
              <button className="share-profile-btn" onClick={() => resumeInputRef.current.click()} style={{ background: '#2563eb', color: 'white', border: 'none' }}>
                {resumeFile ? "🔄 Change PDF" : "📤 Upload PDF"}
              </button>
              {resumeFile && <p style={{ marginTop: '15px', color: '#10b981', fontWeight: 'bold' }}>✅ Selected File: {resumeFile.name}</p>}
            </div>
          )}

          {activeTab === "Certifications" && (
            <div className="empty-tab-placeholder">
              <h3>🎓 My Certifications</h3>
              <button className="share-profile-btn" onClick={() => certInputRef.current.click()} style={{ background: '#2563eb', color: 'white', border: 'none' }}>
                {certFile ? "🔄 Change Certificate" : "📤 Upload Certificate"}
              </button>
              {certFile && <p style={{ marginTop: '15px', color: '#10b981', fontWeight: 'bold' }}>✅ Selected Certificate: {certFile.name}</p>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}