import { useState, useEffect } from "react"
import { update_portfolio } from "../../../api/portfolio";

export default function PortfolioForm({ initialPortfolio, canEdit, edit, onRefresh }) {

  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [published, setPublished] = useState(false);

  // Reset files and index whenever initialFiles changes
  useEffect(() => {
    setPortfolio(initialPortfolio);
  }, [initialPortfolio]);

  // handles the publish switch button
  const switchPublishStatus = () => {
    const new_status = !published;
    setPublished(new_status);
  };

  // Handles updates for all portfolio form inputs
  const handlePortfolioChange = (e) => {
    const { name, value } = e.target;
    setPortfolio((prev) => ({ ...prev, [name]: value }));
  };

  // handles the share button, when clicked copy the link to user's clipboard
  const handleShare = () => {
    const share_link = `http://localhost:5173/portfolio/${portfolio.id}`;
    navigator.clipboard.writeText(share_link)
  }

  // Handles saving the user's info 
  const handleSave = async (e) => {

    // prevents page from reloading after submiting page
    e.preventDefault();

    try {
      //construct the request
      const updatedPortfolio = {
        ...portfolio,
        is_published: published,
      };
      //call the update API endpoint and pass it the data
      await update_portfolio(updatedPortfolio);
      setPortfolio(updatedPortfolio)
      alert("changes saved!")
      onRefresh();
    } catch (error) {
      //alert user in case of an error
      alert("something went wrong")
      console.error("Save failed:", error);
    }
  }

  return (
    <form onSubmit={handleSave}>

      <div className="profile-field-block">
       <div className="profile-field-header">
        <span>Role</span>
          </div>
       <input
         type="text"
         name="role_title"
         value={portfolio.role_title}
         disabled={!canEdit}
         onChange={handlePortfolioChange}
         placeholder="Enter role"
      />
      </div>

      <div className="profile-field-block">
       <div className="profile-field-header">
        <span>University</span>
       </div>
      <input
        type="text"
        name="university"
        value={portfolio.university}
        disabled={!canEdit}
        onChange={handlePortfolioChange}
        placeholder="Enter university name"
     />
      </div>



    <div className="profile-field-block">
       <div className="profile-field-header">
       <span>Major</span>
      </div>
       <input
       type="text"
       name="major"
       value={portfolio.major}
       disabled={!canEdit}
       onChange={handlePortfolioChange}
       placeholder="Enter major name"
      />
    </div>

    <div className="profile-field-block">
      <div className="profile-field-header">
       <span>About</span>
      </div>
      <textarea
          value={portfolio.about_me}
          disabled={!canEdit}
          name="about_me"
          onChange={handlePortfolioChange}
          rows="5"
          placeholder="Tell recruiters about yourself..."
        />
     </div>

      {canEdit && <> <button type="button" onClick={switchPublishStatus}>
        {published ? <>Public</> : <>Private</>}
      </button>
        {portfolio.is_published && <button onClick={handleShare} >
          Share
        </button>}
        <button className="submit-button" type="submit">
          save
        </button></>}

    </form>
  )

}