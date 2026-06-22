import API from "./client";

// Add skill api call
// Sends skill data to the backend skills endpoint to be stored
export const add_skill = async (skill_data) => {
    const response = await API.post("/skills", skill_data);
    return response.data;
};

// Delete skill api call
// Sends a request to the skills endpoint to delete a skill
export const delete_skill = async (skill_id) => {
  const response = await API.delete(`/skills/${skill_id}`);
  return response.data;
};


