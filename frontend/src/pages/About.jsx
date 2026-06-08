// About page component that provides information about the JADEER platform.
export default function About() {
  return (
    <div className="about-page">

      <div className="about-hero">

        <h1>About JADEER</h1>

        <p>
          JADEER is a student portfolio platform designed
          to help students showcase their skills, projects,
          achievements, and professional growth.
        </p>

      </div>

      <div className="about-content">

        <div className="about-card">
          <h2>Our Mission</h2>

          <p>
            Empower students by providing a professional
            space to display their work and connect with
            recruiters and employers.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Vision</h2>

          <p>
            Become the leading platform for student
            portfolios and career opportunities.
          </p>
        </div>

        <div className="about-card">
          <h2>What We Offer</h2>

          <ul>
            <li>Professional Student Portfolios</li>
            <li>Project Showcase</li>
            <li>CV Upload</li>
            <li>Recruiter Discovery</li>
            <li>Career Opportunities</li>
          </ul>
        </div>

      </div>

    </div>
  );
}