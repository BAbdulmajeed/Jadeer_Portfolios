// Search bar component for searching portfolios.
export default function SearchBar() {
  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Search portfolios..."
      />

      <button>
        Search
      </button>

    </div>
  );
}