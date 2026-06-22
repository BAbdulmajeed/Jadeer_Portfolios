import { add_skill, delete_skill } from "../api/skills";
import { useState, useEffect } from "react";
export default function useSkills(portfolioID, projectID = null, initialSkills, setSkill, refresh) {

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // if project ID exists reterieve all skills that belong to project ID
        const filtered_skills = projectID
            ? initialSkills?.filter(s => s.project_id === projectID)
            : initialSkills?.filter(s => s.project_id === null)

        setSkills(filtered_skills);
    }, [initialSkills, projectID]);

    // Handles calling the add skills API endpoint
    const addToSkillsList = async (skill) => {
        try {

            //construct request body 
            const skillData = {
                ...skill,
                portfolio_id: portfolioID,
            };

            // check if a project id is provided, if true include it in the request body
            if (projectID != null) {
                skillData.project_id = projectID
            }

            //call the add skill API endpoint
            await add_skill(skillData);
            setSkill({
                skill_name: "",
                level_of_proficiency: 1,
                portfolio_id: null,
                project_id: null,
            })
            refresh();

        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    // handle calling the delete skill API endpoint
    const handleDeleteSkill = async (skillId) => {
        try {
            // handle calling the delete skill API endpoint
            await delete_skill(skillId);
            refresh();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return { skills, addToSkillsList, handleDeleteSkill}

}