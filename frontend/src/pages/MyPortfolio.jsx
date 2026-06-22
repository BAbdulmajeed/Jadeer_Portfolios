import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get_my_portfolio, get_user_portfolio_by_id, } from "../api/portfolio";
import ProfileSideBar from "../components/portfolio/ProfileSideBar";
import ProfileHeader from "../components/portfolio/ProfileHeader";
import ProfileTabs from "../components/portfolio/ProfileTabs";
import { add_file, update_file } from "../api/files";


export default function MyPortfolio({ canEdit }) {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState({
    id: null,
    role_title: "",
    description: "",
    university: "",
    major: "",
    about_me: "",
    is_published: false,
  });

  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    phone_number: "",
    birth_day: "",
    location: "",
  });

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const edit = canEdit && <span>✎</span>;
  const avatarInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const coverInputRef = useRef(null);
  const [coverImage, setCoverImage] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [resume, setResume] = useState(null);


  // handles file change API call
  const handleFileChange = async (e, file_setter) => {

    //Retrieve the file from the input event object
    const changed_file = e.target.files[0]

    //Check if there is a file, if false exit function
    if (!changed_file) return;

    //store file data and paramaters
    const purpose_label = e.target.name
    const file_data = {
      portfolio_id: portfolio.id,
      file_purpose: purpose_label
    };

    try {
      let response;
      // check if file already exits
      // if true call the update file API endpoint to update and replace the old file with the new file
      // if false call the add file endpoint to add file
      const file_exists = files.find(f => f.file_purpose === purpose_label);
      if (file_exists) {
        response = await update_file(file_exists.id, purpose_label, changed_file)
      } else {
        response = await add_file(file_data, changed_file)
      }
      const file_url = `http://localhost:8000/${response.storage_path}`;
      file_setter(file_url);

      // Refresh all information to ensure data stays synchronized
      await fetchPortfolio();

    } catch (error) {
      console.error(error.response?.data)
    }

  };


  // Fetch portfolio 
  const fetchPortfolio = async () => {
    try {

      // check if the current user owns the portfolio 
      //if true get the current user's portfolio
      //if false get portfolio by user id
      const data = canEdit
        ? await get_my_portfolio()
        : await get_user_portfolio_by_id(id);


      setPortfolio({
        id: data.id || "",
        role_title: data.role_title || "",
        description: data.description || "",
        university: data.university || "",
        major: data.major || "",
        about_me: data.about_me || "",
        is_published: data.is_published,
      });

      setUser({
        id: data.user.id || "",
        email: data.user.email || "",
        name: data.user.name || "",
        location: data.user.location || "",
        phone_number: data.user.phone_number || "",
        birth_day: data.user.birth_day || null,
      });

      setProjects(data.projects || []);
      setSkills(data.skills || []);
      setLanguages(data.languages || []);
      setFiles(data.files || []);
      setLinks(data.external_links || []);
      setCertificates(data.files?.filter(f => f.file_purpose === "certificates") || [])
      setResume(data.files?.find(f => f.file_purpose === "resume") || null)

      // Search files for a profile image
      const profileFile = data.files?.find(f => f.file_purpose === "profile_image");
      if (profileFile) setProfileImage(`http://localhost:8000/${profileFile.storage_path}`);

      // Search files for a cover image
      const coverFile = data.files?.find(f => f.file_purpose === "portfolio_cover");
      if (coverFile) setCoverImage(`http://localhost:8000/${coverFile.storage_path}`);

    } catch (error) {
      // alert user in case of an error
      alert("something went wrong")
      console.error(error);
    }
  };

  // execute fetchPortfolio after component renders
  useEffect(() => { fetchPortfolio(); }, [id, canEdit]);

  return (<>
    <input type="file" name="profile_image" accept="image/*" ref={avatarInputRef} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setProfileImage)} disabled={!canEdit} />
    <input type="file" name="portfolio_cover" accept="image/*" ref={coverInputRef} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setCoverImage)} disabled={!canEdit} />

    {/* الحاوية الخارجية الكبرى الموحدة */}
    <div className="portfolio-page-wrapper">
      <div className="profile-page-container">
        
        {/* العمود الأيسر: السايدبار يظل في البداية ليكون على اليسار */}
        <ProfileSideBar
          user={user}
          portfolio={portfolio}
          skills={skills}
          languages={languages}
          links={links}
          canEdit={canEdit}
          edit={edit}
          onRefresh={fetchPortfolio}
          profileImage={profileImage}
          avatarInputRef={avatarInputRef}
        />

        {/* العمود الأيمن بالكامل: حاوية مشتركة تجمع الهيدر وتحته المشاريع */}
        <div className="portfolio-main-tabs-wrapper">
          
          {/* الغلاف (Header) بالأعلى تماماً داخل الجانب الأيمن */}
          <div className="portfolio-cover-wrapper">
            <ProfileHeader
              coverInputRef={coverInputRef}
              cover={coverImage}
              canEdit={canEdit}
            />
          </div>

          {/* التبويبات والمشاريع تأتي مباشرة أسفل الغلاف */}
          <ProfileTabs
            Projects={projects}
            resume={resume}
            certificates={certificates}
            canEdit={canEdit}
            portfolioID={portfolio.id}
            refresh={fetchPortfolio}
          />
          
        </div>
      </div>
    </div>
  </>);
}
