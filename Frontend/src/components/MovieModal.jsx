import React, { useState, useEffect } from "react";
import { fetchMovieDetails } from "../services/movieApi";
import { X, Star, Clock } from "lucide-react";

const MovieModal = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posterError, setPosterError] = useState(false);

  useEffect(() => {
    if (!imdbID) return;
    
    const getDetails = async () => {
      setLoading(true);
      setPosterError(false);
      try {
        const data = await fetchMovieDetails(imdbID, "");
        setMovie(data);
      } catch (err) {
        console.error("Failed to load details:", err);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [imdbID]);

  // Backdrop click helper
  const handleBackdropClick = (e) => {
    if (e.target.className === "movie-modal-backdrop") {
      onClose();
    }
  };

  return (
    <div className="movie-modal-backdrop" onClick={handleBackdropClick}>
      <div className="movie-modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className="modal-loading">Loading movie details...</div>
        ) : movie ? (
          <div className="movie-details-layout">
            <div className="modal-poster-col">
              {!posterError ? (
                <img
                  src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                  alt={movie.Title}
                  className="modal-movie-poster"
                  onError={() => setPosterError(true)}
                />
              ) : (
                <div className="movie-poster-fallback modal-fallback">
                  <span className="fallback-movie-icon">🎬</span>
                  <h4 className="fallback-movie-title">{movie.Title}</h4>
                </div>
              )}
            </div>
            
            <div className="modal-info-col">
              <h2 className="modal-movie-title">{movie.Title}</h2>
              
              <div className="modal-meta-row">
                <span className="modal-movie-year">{movie.Year}</span>
                <span className="meta-divider">•</span>
                <span className="modal-movie-runtime">
                  <Clock size={14} className="meta-icon" />
                  {movie.Runtime}
                </span>
                <span className="meta-divider">•</span>
                <span className="modal-movie-rating">
                  <Star size={14} className="meta-icon star-active" />
                  {movie.imdbRating} / 10
                </span>
              </div>

              <div className="modal-genres-container">
                {movie.Genre && movie.Genre.split(",").map((genre) => (
                  <span key={genre.trim()} className="genre-tag">
                    {genre.trim()}
                  </span>
                ))}
              </div>

              <div className="modal-section">
                <h4 className="section-title">Plot</h4>
                <p className="section-text">{movie.Plot}</p>
              </div>

              <div className="modal-section">
                <h4 className="section-title">Cast</h4>
                <p className="section-text">{movie.Actors}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-error">Failed to load movie details.</div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
