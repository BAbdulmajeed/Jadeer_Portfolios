import API from "./client";

// Get user info api call
// Retrieve user's info by user id
export const get_my_info = async (user_id) => {
    const response = await API.get(`/users/${user_id}`);
    return response.data;
};

// Update user info api call
// Send new user info to the backend user endpoint to update user's info
export const update_my_info = async (user_id,user_data) => {
    const response = await API.put(`/users/${user_id}`, user_data);
    return response.data;
};


