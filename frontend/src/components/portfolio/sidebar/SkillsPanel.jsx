import { useState, useEffect } from "react";
import { add_skill, delete_skill } from "../../../api/skills";
import useSkills from "../../../hooks/useSkills";
import useInputChange from "../../../hooks/useInputChange";

export default function SkillsPanel({ initialSkills, portfolioID, canEdit, edit, refresh, projectID = null }) {

  const [skill, setSkill] = useState({
    skill_name: "",
    level_of_proficiency: 1,
    portfolio_id: null,
    project_id: null
  });

  const levelMap = {
    1: "Beginner",
    3: "Competent",
    5: "Proficient",
  };

  const { skills, addToSkillsList,
    handleDeleteSkill } =
    useSkills(portfolioID,
      projectID,
      initialSkills,
      setSkill,
      refresh)



  const handleChange = useInputChange();


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
            onChange={(e) => handleChange(e, setSkill)}
            placeholder="Enter here"
          />

          <select
            name="level_of_proficiency"
            value={skill.level_of_proficiency}
            onChange={(e) => handleChange(e, setSkill)}
          >
            <option value={1}>Beginner</option>
            <option value={3}>Competent</option>
            <option value={5}>Proficient</option>
          </select>

          <button type="button" onClick={() => addToSkillsList(skill)} className="add-btn-sidebar">
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
  )
}