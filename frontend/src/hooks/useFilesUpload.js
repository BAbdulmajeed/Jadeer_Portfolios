import { add_file, update_file } from "../api/files";

export default function useFilesUpload(files, portfolioID, projectID = null, refresh) {

    // handles file change API call
    const handleFileChange = async (e) => {

        // Retrieve the file from the input event object
        const changed_file = e.target.files[0]

        // Check if there is a file, if false exit function
        if (!changed_file) return;

        // Store file data and paramaters
        const purpose_label = e.target.name
        const file_data = {
            portfolio_id: portfolioID,
            file_purpose: purpose_label,
        }; 

        if (projectID){
            file_data.project_id = projectID
        }

        try {
            let response;

            if (purpose_label === "project_images" || purpose_label === "certificates") {
                response = await add_file(file_data, changed_file)
            } else {
                // for other type of files, check if file already exits
                // if true call the update file API endpoint to update and replace the old file with the new file
                // if false call the add file endpoint to add file
                const file_exists = files.find(f => f.file_purpose === purpose_label);
                if (file_exists) {
                    response = await update_file(file_exists.id, purpose_label, changed_file)
                } else {
                    response = await add_file(file_data, changed_file)
                }
            }


            //const file_url = `http://localhost:8000/${response.storage_path}`;
            //file_setter(file_url);

            // Refresh all information to ensure data stays synchronized
            refresh()

        } catch (error) {
            console.error(error.response?.data || error.message);
        }


    };
    

    return { handleFileChange }

}

