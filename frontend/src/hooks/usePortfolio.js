import { useState, useEffect } from "react";
import { get_my_portfolio, get_user_portfolio_by_id } from "../api/portfolio";

export default function usePortfolio(id, canEdit) {

    const [portfolio, setPortfolio] = useState({});
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [files, setFiles] = useState([]);
    const [links, setLinks] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [resume, setResume] = useState(null);


    // Fetch portfolio 
    const fetchPortfolio = async () => {
        try {

            // check if the current user owns the portfolio 
            //if true get the current user's portfolio
            //if false get portfolio by user id
            const data = canEdit
                ? await get_my_portfolio()
                : await get_user_portfolio_by_id(id);


            setPortfolio({
                id: data.id || "",
                role_title: data.role_title || "",
                description: data.description || "",
                university: data.university || "",
                major: data.major || "",
                about_me: data.about_me || "",
                is_published: data.is_published,
            });

            setUser({
                id: data.user.id || "",
                email: data.user.email || "",
                name: data.user.name || "",
                location: data.user.location || "",
                phone_number: data.user.phone_number || "",
                birth_day: data.user.birth_day || null,
            });

            setProjects(data.projects || []);
            setSkills(data.skills || []);
            setLanguages(data.languages || []);
            setFiles(data.files || []);
            setLinks(data.external_links || []);
            setCertificates(data.files?.filter(f => f.file_purpose === "certificates") || [])
            setResume(data.files?.find(f => f.file_purpose === "resume") || null)

            // Search files for a profile image
            const profileFile = data.files?.find(f => f.file_purpose === "profile_image");
            if (profileFile) setProfileImage(`http://localhost:8000/${profileFile.storage_path}`);

            // Search files for a cover image
            const coverFile = data.files?.find(f => f.file_purpose === "portfolio_cover");
            if (coverFile) setCoverImage(`http://localhost:8000/${coverFile.storage_path}`);

        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    // execute fetchPortfolio after component renders
    useEffect(() => { fetchPortfolio(); }, [id, canEdit]);

    return {
        portfolio,
        setPortfolio,
        user,
        setUser,
        projects,
        skills,
        languages,
        links,
        files,
        certificates,
        resume,
        profileImage,
        setCoverImage,
        setCertificates,
        setProfileImage,
        coverImage,
        fetchPortfolio
    }
}