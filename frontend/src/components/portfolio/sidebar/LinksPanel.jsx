import { useState, useEffect } from "react";
import useInputChange from "../../../hooks/useInputChange";
import useLinks from "../../../hooks/useLinks";

export default function LinksPanel({ initialLinks, portfolioID, canEdit, edit, refresh, projectID = null }) {

  const [link, setLink] = useState({
        label: "",
        url: "",
        portfolio_id: null,
        project_id: null,
    });

    const handleChange = useInputChange();

    const {links, addToLinksList, handleDeleteLink} = useLinks(
      initialLinks,
      portfolioID,
      projectID,
      setLink,
      refresh
    )



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
            onChange={(e) => handleChange(e, setLink)}
            placeholder="Enter link label"
          />

          <input
            required
            type="url"
            name="url"
            value={link.url}
            onChange={(e) => handleChange(e, setLink)}
            placeholder="Enter URL"
          />
          
          <button type="button" onClick={() => addToLinksList(link)} className="add-btn-sidebar">
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
