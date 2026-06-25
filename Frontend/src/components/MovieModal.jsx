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
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }} onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-dark border-secondary text-white position-relative" style={{ borderRadius: "20px" }}>
          <button className="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3 shadow-none" onClick={onClose} aria-label="Close" />

          {loading ? (
            <div className="modal-body text-center p-5 text-secondary fs-5">Loading movie details...</div>
          ) : movie ? (
            <div className="modal-body p-4 p-md-5">
              <div className="row g-4">
                <div className="col-12 col-md-5 text-center">
                  {!posterError ? (
                    <img
                      src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                      alt={movie.Title}
                      className="img-fluid rounded shadow-lg w-100 object-fit-cover"
                      onError={() => setPosterError(true)}
                      style={{ maxHeight: "400px" }}
                    />
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center bg-secondary bg-opacity-10 rounded p-4 h-100" style={{ minHeight: "350px" }}>
                      <span className="fs-1 mb-2">🎬</span>
                      <h4 className="h5 text-white">{movie.Title}</h4>
                    </div>
                  )}
                </div>
                
                <div className="col-12 col-md-7 text-start">
                  <h2 className="h2 fw-bold text-white mb-3 pe-4">{movie.Title}</h2>
                  
                  <div className="d-flex align-items-center gap-2 mb-3 text-secondary small flex-wrap">
                    <span className="badge bg-secondary">{movie.Year}</span>
                    <span>•</span>
                    <span className="d-flex align-items-center gap-1">
                      <Clock size={12} />
                      {movie.Runtime}
                    </span>
                    <span>•</span>
                    <span className="d-flex align-items-center gap-1 text-warning">
                      <Star size={12} className="fill-warning" />
                      {movie.imdbRating} / 10
                    </span>
                  </div>

                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {movie.Genre && movie.Genre.split(",").map((genre) => (
                      <span key={genre.trim()} className="badge bg-success bg-opacity-75 text-white rounded-pill px-3 py-2" style={{ fontSize: "0.8rem" }}>
                        {genre.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4">
                    <h4 className="h6 text-success fw-bold text-uppercase mb-2" style={{ letterSpacing: "1px" }}>Plot</h4>
                    <p className="text-light-50 small mb-0" style={{ lineHeight: "1.6" }}>{movie.Plot}</p>
                  </div>

                  <div className="mb-0">
                    <h4 className="h6 text-success fw-bold text-uppercase mb-2" style={{ letterSpacing: "1px" }}>Cast</h4>
                    <p className="text-light-50 small mb-0" style={{ lineHeight: "1.6" }}>{movie.Actors}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-body text-center p-5 text-danger">Failed to load movie details.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
