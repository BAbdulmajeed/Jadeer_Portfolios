import { Link } from "react-router-dom";

// Footer component for displaying platform information,
// navigation links, and contact details.
export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h3>JADEER</h3>

          <p>
            Empowering students to showcase their
            skills, projects, and achievements.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>

          <p>info@jadeer.com</p>
          <p>+966 500 000 000</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 JADEER. All Rights Reserved.
      </div>

    </footer>
  );
}