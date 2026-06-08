export default function ProjectDetails() {
  // Project Details page component for displaying complete project information.
  return (
    <div className="details-page">

      <div className="details-card">

        <img
          src="https://via.placeholder.com/900x450"
          alt="Project"
          className="project-banner"
        />

        <h1>Portfolio Website</h1>

        <p className="project-tech">
          React • CSS • JavaScript
        </p>

        <p className="project-description">
          This project is a personal portfolio website
          designed to showcase skills, projects, and
          achievements in a professional way.
        </p>

        <div className="project-links">

          <a href="#">
            GitHub Repository
          </a>

          <a href="#">
            Live Demo
          </a>

        </div>

        <h2>Project Gallery</h2>

        <div className="gallery">

          <img
            src="https://via.placeholder.com/300"
            alt="Gallery 1"
          />

          <img
            src="https://via.placeholder.com/300"
            alt="Gallery 2"
          />

          <img
            src="https://via.placeholder.com/300"
            alt="Gallery 3"
          />

        </div>

      </div>

    </div>
  );
}