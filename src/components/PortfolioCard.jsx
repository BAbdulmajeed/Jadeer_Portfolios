import { Link } from "react-router-dom";

// Portfolio card component for displaying student information.
export default function PortfolioCard({
  name,
  major,
  university,
  image,
}) {
  return (
    <div className="portfolio-card">

      <img
        src={image}
        alt={name}
        className="portfolio-image"
      />

      <h3>{name}</h3>

      <p>{major}</p>

      <span>{university}</span>

      <Link
        to="/portfolio-details"
        className="view-btn"
      >
        View Portfolio
      </Link>

    </div>
  );
}