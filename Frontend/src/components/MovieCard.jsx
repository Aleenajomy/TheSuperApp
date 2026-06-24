import React, { useState } from "react";

const MovieCard = ({ movie, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="movie-card" onClick={onClick}>
      {!imageError ? (
        <img
          src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
          alt={movie.Title}
          className="movie-poster"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="movie-poster-fallback">
          <span className="fallback-movie-icon">🎬</span>
          <h4 className="fallback-movie-title">{movie.Title}</h4>
          <span className="fallback-movie-year">{movie.Year}</span>
        </div>
      )}
      <div className="movie-card-overlay">
        <h4 className="movie-card-title">{movie.Title}</h4>
        <span className="movie-card-year">{movie.Year}</span>
      </div>
    </div>
  );
};

export default MovieCard;
