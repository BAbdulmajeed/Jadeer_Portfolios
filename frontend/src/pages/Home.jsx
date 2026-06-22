import { useNavigate } from "react-router-dom";
// Home page component that introduces the JADEER platform and its main features.
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-left">

          <span className="hero-badge">
            Student Portfolio Platform
          </span>

          <h1>
            Showcase <br />
            Your Talent.
          </h1>

          <p>
            Build your professional portfolio and connect
            with recruiters through JADEER.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

          </div>

        </div>

        <div className="hero-right">

          <video
            src="/ja.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls
          />

        </div>

      </section>


      {/* Statistics */}

      <section className="stats">

        <div className="stat-box">
          <h3>5,000+</h3>
          <p>Students</p>
        </div>

        <div className="stat-box">
          <h3>500+</h3>
          <p>Projects</p>
        </div>

        <div className="stat-box">
          <h3>100+</h3>
          <p>Recruiters</p>
        </div>

        <div className="stat-box">
          <h3>2,000+</h3>
          <p>Connections</p>
        </div>

      </section>

    </div>
  );
}