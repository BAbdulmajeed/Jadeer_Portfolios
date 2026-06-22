import { useState, useEffect } from "react";
import { add_link, delete_link } from "../api/externalLinks";

export default function useLinks(initialLinks, portfolioID, projectID = null, setLink, refresh ) {

    const [links, setLinks] = useState([]);

    // Reset files and index whenever initialFiles changes
    useEffect(() => {
        const filtered_links = projectID
            ? initialLinks?.filter(l => l.project_id === projectID)
            : initialLinks?.filter(l => l.project_id === null)

        setLinks(filtered_links);
    }, [initialLinks, projectID])

    
    // Handles calling the add links API endpoint
    const addToLinksList = async (link) => {
        try {
            //construct the request body
            const linkData = {
                ...link,
                portfolio_id: portfolioID,
            };

            //check if a project id, if true add it to the request 
            if (projectID) {
                linkData.project_id = projectID
            }

            //call add link API endpoint
            await add_link(linkData);
            refresh();

            setLink({
                label: "",
                url: "",
                portfolio_id: null,
                project_id: null,
            });

        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleDeleteLink = async (linkID) => {
        try {
            await delete_link(linkID);
            refresh();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return {links, addToLinksList, handleDeleteLink}
}