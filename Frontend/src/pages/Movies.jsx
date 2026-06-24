import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { searchMovieByGenre } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import avatarImg from "../assets/user_avatar.png";

const Movies = () => {
  const categories = useStore((state) => state.categories);
  const navigate = useNavigate();

  const [moviesData, setMoviesData] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      const data = {};
      try {
        for (const category of categories) {
          const list = await searchMovieByGenre(category, "");
          data[category] = list;
        }
        setMoviesData(data);
      } catch (err) {
        console.error("Error loading movie catalog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchAllMovies();
    }
  }, [categories]);

  return (
    <div className="movies-page">
      <header className="movies-header">
        <h1 className="brand-logo" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          Super app
        </h1>
        <img
          src={avatarImg}
          alt="User Profile"
          className="header-profile-avatar"
          onClick={() => navigate("/dashboard")}
          title="Go to Dashboard"
        />
      </header>

      <main className="movies-content">
        <h2 className="movies-page-title">Entertainment according to your choice</h2>

        {loading ? (
          <div className="movies-loading-state">Loading your personalized movie recommendations...</div>
        ) : (
          <div className="movies-category-list">
            {categories.map((category) => {
              const movies = moviesData[category] || [];
              return (
                <div key={category} className="category-movies-row-container">
                  <h3 className="category-row-title">{category}</h3>
                  <div className="movies-row">
                    {movies.length > 0 ? (
                      movies.slice(0, 4).map((movie) => (
                        <MovieCard
                          key={movie.imdbID}
                          movie={movie}
                          onClick={() => setSelectedMovieId(movie.imdbID)}
                        />
                      ))
                    ) : (
                      <p className="no-movies-fallback">No movies found for this category.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {selectedMovieId && (
        <MovieModal
          imdbID={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default Movies;
