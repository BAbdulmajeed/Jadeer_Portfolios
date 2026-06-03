import SearchBar from "../components/SearchBar";
import PortfolioCard from "../components/PortfolioCard";
// Browse page component for exploring student portfolios.
export default function Browse() {
  return (
    <div className="browse-page">

      <div className="browse-header">
        <h1>Browse Portfolios</h1>

        <p>
          Discover talented students and explore
          their professional portfolios.
        </p>
      </div>

      <SearchBar />

      <div className="categories">
        <button>All</button>
        <button>Web</button>
        <button>Design</button>
        <button>Photography</button>
        <button>Marketing</button>
      </div>

      <div className="portfolio-grid">

        <PortfolioCard
          name="John Developer"
          major="Computer Science"
          university="Qassim University"
          image="https://via.placeholder.com/150"
        />

        <PortfolioCard
          name="Sarah Designer"
          major="UI/UX Design"
          university="Qassim University"
          image="https://via.placeholder.com/150"
        />

        <PortfolioCard
          name="Mike Photographer"
          major="Photography"
          university="Qassim University"
          image="https://via.placeholder.com/150"
        />

        <PortfolioCard
          name="Emma Marketing"
          major="Marketing"
          university="Qassim University"
          image="https://via.placeholder.com/150"
        />

      </div>

    </div>
  );
}