import { Link } from "react-router-dom";

// Project card component for displaying project information.
export default function ProjectCard({
  title,
  description,
  image,
}) {
  return (
    <div className="project-card">

      <img
        src={image}
        alt={title}
      />

      <h3>{title}</h3>

      <p>{description}</p>

      <Link
        to="/project-details"
        className="view-btn"
      >
        View Details
      </Link>

    </div>
  );
}