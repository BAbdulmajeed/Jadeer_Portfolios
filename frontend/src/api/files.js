import API from "./client";


// Add file api call
// Sends file data to the backend external-links endpoint to be stored
export const add_file = async (file_data, file) => {
    const form_data = new FormData();
    form_data.append("file", file);

    // request parameters
    const params = {
        portfolio_id: file_data.portfolio_id,
        file_purpose: file_data.file_purpose,
    };

    // check if project ID is provided, if true add to the request parameters
    if (file_data.project_id != null) {
        params.project_id = file_data.project_id;
    }

    const response = await API.post("/files/upload", form_data, { params });
    return response.data;
};


// Update file api call
// Sends new file data to the backend external-links endpoint to be updated
export const update_file = async (file_id, file_purpose, file) => {

    const form_data = new FormData();
    form_data.append("file", file);

    // request parameters
    const params = {
        file_id: file_id,
        file_purpose: file_purpose
    };

    const response = await API.post(`/files/${file_id}`, form_data, { params });
    return response.data;
};


// Delete file api call
// Sends a request to the backend files endpoint to delete a file
export const delete_file = async (file_id) => {
    const response = await API.delete(`/files/${file_id}`);
    return response.data;
};

