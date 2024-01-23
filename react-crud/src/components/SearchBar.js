import React, { useState } from 'react';
import './SearchBar.css'; // Import a CSS file for styling

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // A state variable for loading indicator
  const [error, setError] = useState(null); // A state variable for error message

  const handleSearch = (event) => {
    event.preventDefault();

    // Perform search logic based on your requirements
    // Example using a hypothetical API call:
    // Check for empty or invalid input
    if (!searchTerm || searchTerm.trim() === '') {
      setError('Please enter a valid search term');
      return;
    }
    // Clear any previous error message
    setError(null);
    // Show the loading indicator
    setLoading(true);
    fetch('/api/search?term=' + searchTerm)
      .then(response => response.json())
      .then(results => {
        // Hide the loading indicator
        setLoading(false);
        // Pass the results to the onSearch prop function
        onSearch(results);
      })
      .catch(err => {
        // Hide the loading indicator
        setLoading(false);
        // Set the error message
        setError('Something went wrong. Please try again later.');
      });
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <label htmlFor="search-input" className="search-label">Search</label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search..."
        className="search-input"
        aria-label="Search"
      />
      <button type="submit" className="search-button" aria-label="Search" disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
      {error && <p className="search-error">{error}</p>}
    </form>
  );
}

export default SearchBar;
