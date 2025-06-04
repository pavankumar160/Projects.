import React, { useEffect, useState } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({
    genre: 'all',
    country: 'all',
    language: 'all',
    year: 'all',
  });

  useEffect(() => {
    fetch('/movies.json')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch(err => console.error('Error loading movies:', err));
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const applyFilters = () => {
    const filtered = movies.filter(movie =>
      (filters.genre === 'all' || movie.genre === filters.genre) &&
      (filters.country === 'all' || movie.country === filters.country) &&
      (filters.language === 'all' || movie.language.toLowerCase() === filters.language.toLowerCase()) &&
      (filters.year === 'all' || movie.year.toString() === filters.year)
    );
    setFilteredMovies(filtered);
  };

  return (
    <>
      <section id="filters">
        {['genre', 'country', 'language', 'year'].map(field => (
          <div className="filter-group" key={field}>
            <label htmlFor={field}>{field}</label>
            <select id={field} value={filters[field]} onChange={handleChange}>
              <option value="all">All</option>
            </select>
          </div>
        ))}
        <button onClick={applyFilters} className="filter-button">Filter</button>
      </section>

      <section id="movie-list" className="movie-grid">
        {filteredMovies.length === 0 ? (
          <div className="no-result">Result Not Found</div>
        ) : (
          filteredMovies.map((movie, index) => (
            <div className="movie-item" key={index}>
              <img src={movie.image} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.year} • {movie.duration} • {movie.language}</p>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default MovieList;
