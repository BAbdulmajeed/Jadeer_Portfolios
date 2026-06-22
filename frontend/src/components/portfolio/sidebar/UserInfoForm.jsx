import { useState ,useEffect} from "react"
import { update_my_info } from "../../../api/user";

export default function UserInfoForm({initialUser, canEdit, edit, onRefresh}) {

    const [user, setUser] = useState(initialUser);

    // Reset files and index whenever initialFiles changes
    useEffect(() => {
    setUser(initialUser);
    }, [initialUser]);

    // Handles updates for all user form inputs
    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    // Handles saving the user's info 
    const handleSave = async(e) => {

        // prevents page from reloading after submiting page
        e.preventDefault();

        // construct the request body
        const { id: user_id, ...user_payload } = user;

        try {
            // call the update API endpoint and pass it the data
            await update_my_info(user_id, user_payload);
            alert("changes saved!")
            onRefresh();
        } catch (error) {
            //alert the user in case of an error
            alert("something went wrong")
            console.error("Save failed:", error);
        }
    }

    return (
        <form onSubmit={handleSave}>
            <label>
            <input
                className="editable-text-btn profile-name"
                type="text"
                name="name"
                value={user.name}
                disabled={!canEdit}
                onChange={handleUserChange}
                placeholder="Enter your full name"
            />
            {edit}

           </label>

          <div className="location-field-block">
          <div className="profile-field-header">
            <span>Location</span>
              </div>
              <input
                type="text"
                name="location"
                value={user.location}
                disabled={!canEdit}
                onChange={handleUserChange}
                placeholder="Enter location"
                 />
            </div>


       

        {canEdit && <button className="submit-button" type="submit">
            save
        </button>}
        
        </form>
    )

}