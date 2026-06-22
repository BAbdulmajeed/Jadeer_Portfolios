export default function ProfileHeader({ coverInputRef, cover, canEdit }) {
  return (
    <button
      type="button" className="profile-cover-banner-btn" onClick={() => coverInputRef.current.click()}
      style={
        cover
          ? { backgroundImage: `url(${cover})`, backgroundSize: "cover" }
          : {}
      }
    >
      <div className="cover-inner-content">
        {canEdit && <span className="change-cover-badge"
        >
          📷 Change Cover Photo
        </span>}
      </div>
    </button>
  )
}