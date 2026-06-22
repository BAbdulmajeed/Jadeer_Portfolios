import { useState, useEffect } from "react";
import useInputChange from "../../../hooks/useInputChange";
import useLanguages from "../../../hooks/useLanguages";

export default function LanguagesPanel({ initialLanguages, portfolioID, canEdit, edit, refresh }) {

  const [language, setLanguage] = useState({
    language_name: "",
    proficiency_level: 1,
  });

  const levelMap = {
        1: "Beginner",
        2: "Competent",
        3: "Proficient",
    };

  const handleChange = useInputChange();

  const { languages, addToLanguagesList, handleDeleteLanguage } = useLanguages(
    initialLanguages,
    portfolioID,
    setLanguage,
    refresh
  )

return (
    <div className="profile-field-block">
      
      {/* رأس القسم المتوازي */}
      <div className="profile-field-header">
        <span>Languages</span>
      </div>

      {canEdit && (
        <div className="profile-input-row">
          <input
            required
            type="text"
            name="language_name"
            value={language.language_name}
            onChange={(e) => handleChange(e, setLanguage)}
            placeholder="Enter here"
          />

          <select
            name="proficiency_level"
            value={language.proficiency_level}
            onChange={(e) => handleChange(e, setLanguage)}
          >
            <option value={1}>Beginner</option>
            <option value={2}>Competent</option>
            <option value={3}>Proficient</option>
          </select>

          <button type="button" onClick={() => addToLanguagesList(language)} className="add-btn-sidebar">
            Add
          </button>
        </div>
      )}
      <ol>
  {languages.map((lang, index) => (
    <li key={index}>
      <div className="languages-item-wrapper">
        <span className="language-name-text">{lang.language_name}</span>
        
        <button className="level-button" type="button" disabled>
          {levelMap[lang.proficiency_level] || 'Beginner'}
        </button>
        
        {canEdit && (
          <button
            type="button"
            className="delete-btn-inline"
            onClick={() => handleDeleteLanguage(lang.id)}
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