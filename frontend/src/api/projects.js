import API from "./client";

// Add project api call
// Sends project data to the backend projects endpoint to be stored
export const add_project = async (portfolio_id , project_data) => {
    const response = await API.post(`/projects/portfolio/${portfolio_id}`, project_data);
    return response.data;
};

// Update project api call
// Sends new project data to the projects endpoint to update 
export const update_project = async (project_id,project_data) => {
  const response = await API.put(`/projects/${project_id}`,project_data);
  return response.data;
};

// Get project api call
// Retrieve project by project id
export const get_project = async (project_id) => {
  const response = await API.get(`/projects/${project_id}`);
  return response.data;
};


// Delete project api call
// Sends a request to the projects endpoint to delete a project
export const delete_project = async (project_id) => {
  const response = await API.delete(`/projects/${project_id}`);
  return response.data;
};


