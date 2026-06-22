export default function ProfileHeader({ coverInputRef, cover, canEdit }) {
  return (
    <button
      type="button"
      className="profile-cover-banner-btn"
      onClick={() => coverInputRef.current.click()}
    >
      <img
        src={cover}
        alt="header"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div className="cover-inner-content">
        {canEdit && (
          <span className="change-cover-badge">📷 Change Cover Photo</span>
        )}
      </div>
    </button>
  );
}
