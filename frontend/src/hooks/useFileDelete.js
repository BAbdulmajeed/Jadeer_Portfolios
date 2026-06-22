import { delete_file } from "../api/files"
export default function useFileDelete(refresh) {

    const handleDelete = async (fileID) => {
        try {
            // call delete file API endpoint and pass the file id
            await delete_file(fileID);
            refresh();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    }

    return { handleDelete }

}