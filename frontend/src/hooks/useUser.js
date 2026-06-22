import { useState, useEffect } from "react";
import { update_my_info } from "../api/user";

export default function useUser(initialUser, refresh) {

    const [user, setUser] = useState({});

    // Reset files and index whenever initialFiles changes
    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    // Handles saving the user's info 
    const handleSave = async (e) => {

        // prevents page from reloading after submiting page
        e.preventDefault();

        // construct the request body
        const { id: user_id, ...userData } = user;

        try {
            // call the update API endpoint and pass it the data
            await update_my_info(user_id, userData);
            alert("changes saved!")
            refresh();
        } catch (error) {
            //alert the user in case of an error
            console.error(error.response?.data || error.message);
        }
    }

    return { user, setUser, handleSave }
}