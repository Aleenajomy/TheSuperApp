import React, { useState } from "react";

const MovieCard = ({ movie, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="card h-100 border-0 bg-transparent text-white position-relative overflow-hidden cursor-pointer"
      onClick={onClick}
      style={{
        borderRadius: "12px",
        transition: "transform 0.2s",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {!imageError ? (
        <img
          src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
          alt={movie.Title}
          className="card-img w-100 h-100 object-fit-cover"
          onError={() => setImageError(true)}
          style={{ borderRadius: "12px", minHeight: "280px" }}
        />
      ) : (
        <div className="card-img w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-dark p-3 text-center" style={{ borderRadius: "12px", minHeight: "280px" }}>
          <span className="fs-1 mb-2">🎬</span>
          <h5 className="card-title fs-6 fw-bold mb-1 text-white">{movie.Title}</h5>
          <span className="small text-secondary">{movie.Year}</span>
        </div>
      )}
      <div
        className="card-img-overlay d-flex flex-column justify-content-end p-3"
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)",
          borderRadius: "12px"
        }}
      >
        <h5 className="card-title fs-6 fw-bold mb-1 text-white text-start">{movie.Title}</h5>
        <span className="card-text small text-secondary text-start">{movie.Year}</span>
      </div>
    </div>
  );
};

export default MovieCard;
