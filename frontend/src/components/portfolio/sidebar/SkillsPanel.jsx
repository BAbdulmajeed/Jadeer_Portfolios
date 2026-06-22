import { useState, useEffect } from "react";
import { add_skill, delete_skill } from "../../../api/skills";

export default function SkillsPanel({ initialSkills, portfolioID, canEdit, edit, levelMap, onRefresh, projectID = null }) {

  const [skills, setSkills] = useState([]);

   // Reset files and index whenever initialFiles changes
  useEffect(() => {
    const filtered_skills = projectID
      ? initialSkills?.filter(s => s.project_id === projectID)
      : initialSkills?.filter(s => s.project_id === null)

    setSkills(filtered_skills);
  }, [initialSkills, projectID]);

  const [skill, setSkill] = useState({
    skill_name: "",
    level_of_proficiency: 1,
    portfolio_id: null,
    project_id: null,
  });

   // Handles updates for all skill form inputs
  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkill((prev) => ({ ...prev, [name]: value }));
  };

   // Handles calling the add skills API endpoint
  const addToSkillsList = async () => {
    try {

      //construct request body 
      const payload = {
        ...skill,
        portfolio_id: portfolioID,
      };

      // check if a project id is provided, if true include it in the request body
      if (projectID != null) {
        payload.project_id = projectID
      }

      //call the add skill API endpoint
      await add_skill(payload);
      onRefresh();

      setSkill({
        skill_name: "",
        level_of_proficiency: 1,
        portfolio_id: null,
        project_id: null,
      });

    } catch (error) {
      //alert user in case of an error
      alert("something went wrong")
      console.error(error.response?.data || error.message);
    }
  };

  // handle calling the delete skill API endpoint
  const handleDeleteSkill = async (skillId) => {
    try {
      // handle calling the delete skill API endpoint
      await delete_skill(skillId);
      onRefresh();
    } catch (error) {
      //alert user in case of error
      alert("something went wrong")
      console.error(error.response?.data || error.message);
    }
  };


 return (
    <div className="profile-field-block">
      
      
      <div className="profile-field-header" >
        <span>Skills</span>
      </div>

      {canEdit && (
        <div className="profile-input-row" >
          <input
            required
            type="text"
            name="skill_name"
            value={skill.skill_name}
            onChange={handleSkillChange}
            placeholder="Enter here"
          />

          <select
            name="level_of_proficiency"
            value={skill.level_of_proficiency}
            onChange={handleSkillChange}
          >
            <option value={1}>Beginner</option>
            <option value={3}>Competent</option>
            <option value={5}>Proficient</option>
          </select>

          <button type="button" onClick={addToSkillsList} className="add-btn-sidebar">
            Add
          </button>
        </div>
      )}
    
    
      {/* قائمة عرض المهارات المضافة */}
      <ol>
        {skills.map((skill, index) => (
          <li key={index}>
            <div className="skills-item-wrapper"> 
              
             
              <span className="skill-name-text">{skill.skill_name}</span>
              
              <button className="level-button" type="button" disabled>
                {levelMap[skill.level_of_proficiency]}
              </button>
              
              {canEdit && (
                <button
                  type="button"
                  className="delete-btn-inline" 
                  onClick={() => handleDeleteSkill(skill.id)}
                >
                  Delete
                </button>
              )}
              
            </div>
          </li>
        ))}
      </ol>
    </div>
  )}