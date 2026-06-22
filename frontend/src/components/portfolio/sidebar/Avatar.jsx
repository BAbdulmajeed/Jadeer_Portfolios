export default function Avatar({ avatarInputRef, profileImage, canEdit }) {

  return (
    <div className="avatar-container-center">
      <button type="button" className="edit-avatar-btn" onClick={() => avatarInputRef.current.click()}>
        {profileImage
          ? <img src={profileImage} alt="Avatar" className="avatar-img"/>
          : <> <div className="profile-avatar-placeholder">👤</div> 
          {canEdit && <span className="edit-overlay-text">Edit</span>} </>
        }
        
      </button>
    </div>
  )

}