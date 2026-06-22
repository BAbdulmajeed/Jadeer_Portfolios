import { useState, useEffect } from "react";
import { add_skill, delete_skill } from "../../../api/skills";
import { add_language, delete_language } from "../../../api/languages";

export default function LanguagesPanel({ initialLanguages, portfolioID, canEdit, edit, levelMap, onRefresh }) {

  const [languages, setLanguages] = useState([]);

  // Reset languages and index whenever initialLanguages changes
  useEffect(() => {
    setLanguages(initialLanguages);
  }, [initialLanguages]);

  const [language, setLanguage] = useState({
    language_name: "",
    proficiency_level: 1,
  });

  // Handles updates for all languages form inputs
  const handleLanguageChange = (e) => {
    const { name, value } = e.target;
    setLanguage((prev) => ({ ...prev, [name]: value }));
  };

  // Handles calling the add language API endpoint
  const addToLanguagesList = async () => {
    try {

      //construct request body 
      const new_language = {
        ...language,
        portfolio_id: portfolioID,
      };

      // call the add language API endpoint and passes the new language data
      await add_language(new_language);
      onRefresh();

      setLanguage({
        language_name: "",
        proficiency_level: 1,
      });

    } catch (error) {
      //alerts the user in case of an error
      alert("something went wrong")
      console.error(error.response?.data || error.message);
    }
  };

   // handle calling the delete language API endpoint
  const handleDeleteLanguage = async (language_id) => {
    try {
       // call delete language API endpoint and pass the language id
      await delete_language(language_id);
      onRefresh();
    } catch (error) {
      // alert the user in case of an error
      alert("something went wrong")
      console.error(error.response?.data || error.message);
    }
  };

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
            onChange={handleLanguageChange}
            placeholder="Enter here"
          />

          <select
            name="proficiency_level"
            value={language.proficiency_level}
            onChange={handleLanguageChange}
          >
            <option value={1}>Beginner</option>
            <option value={3}>Competent</option>
            <option value={5}>Proficient</option>
          </select>

          <button type="button" onClick={addToLanguagesList} className="add-btn-sidebar">
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