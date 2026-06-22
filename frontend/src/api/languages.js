import API from "./client";


// Add language api call
// Sends language data to the backend language endpoint to be stored
export const add_language = async (language_data) => {
    const response = await API.post("/languages", language_data);
    return response.data
}

// Delete language api call
// Sends a request to the languages endpoint to delete a languages
export const delete_language = async (language_id) => {
    const response = await API.delete(`/languages/${language_id}`)
    return response.data;
}

