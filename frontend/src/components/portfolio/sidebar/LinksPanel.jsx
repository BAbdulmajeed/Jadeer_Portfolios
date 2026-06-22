import { useState, useEffect } from "react";
import { add_skill, delete_skill } from "../../../api/skills";
import { add_link, delete_link } from "../../../api/externalLinks";

export default function LinksPanel({ initialLinks, portfolioID, canEdit, edit, onRefresh, projectID = null }) {

  const [links, setLinks] = useState([]);

  // Reset files and index whenever initialFiles changes
  useEffect(() => {
    const filtered_links = projectID
      ? initialLinks?.filter(l => l.project_id === projectID)
      : initialLinks?.filter(l => l.project_id === null)

    setLinks(filtered_links);
  }, [initialLinks, projectID])

  const [link, setLink] = useState({
    label: "",
    url: "",
    portfolio_id: null,
    project_id: null,
  });

   // Handles updates for all project form inputs
  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setLink((prev) => ({ ...prev, [name]: value }));
  };

  // Handles calling the add links API endpoint
  const addToLinksList = async () => {
    try {
      //construct the request body
      const payload = {
        ...link,
        portfolio_id: portfolioID,
      };

      //check if a project id, if true add it to the request 
      if (projectID) {
        payload.project_id = projectID
      }

      //call add link API endpoint
      await add_link(payload);
      onRefresh();

      setLink({
        label: "",
        url: "",
        portfolio_id: null,
        project_id: null,
      });

    } catch (error) {
      //alert the user in case of an error
      alert("something went wrong")
      console.error(error.response?.data || error.message);
    }
  };

  const handleDeleteLink = async (link_id) => {
    try {
      await delete_link(link_id);
      onRefresh();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };



 return (
    <div className="profile-field-block">
      
      {/* رأس القسم المتوازي: العنوان والزر في سطر مستقل بالكامل */}
      <div className="profile-field-header">
        <span>Links</span>
      </div>

      {canEdit && (
        <div className="profile-input-row">
          <input
            required
            type="text"
            name="label"
            value={link.label}
            onChange={handleLinkChange}
            placeholder="Enter link label"
          />

          <input
            required
            type="url"
            name="url"
            value={link.url}
            onChange={handleLinkChange}
            placeholder="Enter URL"
          />
          
          <button type="button" onClick={addToLinksList} className="add-btn-sidebar">
            Add
          </button>
        </div>
      )}
<ol>
  {links.map((link, index) => (
    <li key={index}>
      <div className="link-item-wrapper">
        <a 
          href={link.url.startsWith('http') ? link.url : `https://${link.url}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="portfolio-external-link"
        >
          {link.label}
        </a>
        
        {canEdit && (
          <button
            type="button"
            className="delete-btn-inline"
            onClick={() => handleDeleteLink(link.id)}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  ))}
</ol>

    </div> 
  );
}
