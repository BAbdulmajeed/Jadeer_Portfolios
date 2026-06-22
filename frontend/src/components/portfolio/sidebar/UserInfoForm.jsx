import { useState ,useEffect} from "react"
import useInputChange from "../../../hooks/useInputChange";
import useUser from "../../../hooks/useUser";

export default function UserInfoForm({initialUser, canEdit, edit, refresh}) {

    const handleChange = useInputChange();

    const { user, setUser, handleSave } = useUser(initialUser, refresh)

    return (
        <form onSubmit={handleSave}>
            <label>
            <input
                className="editable-text-btn profile-name"
                type="text"
                name="name"
                value={user.name}
                disabled={!canEdit}
                onChange={(e) => handleChange(e, setUser)}
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
                onChange={(e) => handleChange(e, setUser)}
                placeholder="Enter location"
                 />

                 <div className="profile-field-header">
            <span>Birthday</span>
              </div>
              <input
                type="date"
                name="birth_day"
                value={user.birth_day || ""}
                disabled={!canEdit}
                onChange={(e) => handleChange(e, setUser)}
                placeholder="Enter birth day"
                 />

                 <div className="profile-field-header">
            <span>Phone</span>
              </div>
              <input
                type="tel"
                name="phone_number"
                value={user.phone_number || "" }
                disabled={!canEdit}
                onChange={(e) => handleChange(e, setUser)}
                placeholder="Enter Phone number"
                 />
            </div>

            


       

        {canEdit && <button className="submit-button" type="submit">
            save
        </button>}
        
        </form>
    )

}