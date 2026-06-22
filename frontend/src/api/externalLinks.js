import API from "./client";

// Add link api call
// Sends link data to the backend external links endpoint to be stored
export const add_link = async (link_data) => {
    const response = await API.post("/external-links", link_data);
    return response.data;
};

// Add link api call
// Sends a request to the backend external-links endpoint to delete a link
export const delete_link = async (link_id) => {
  const response = await API.delete(`/external-links/${link_id}`);
  return response.data;
};


