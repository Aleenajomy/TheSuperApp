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
    <div className="movies-page container-fluid min-vh-100 p-4 p-md-5 bg-black text-white text-start">
      <header className="movies-header d-flex justify-content-between align-items-center mb-5">
        <h1 className="brand-logo mb-0" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
          Super app
        </h1>
        <img
          src={avatarImg}
          alt="User Profile"
          className="header-profile-avatar rounded-circle border border-2 border-white cursor-pointer"
          style={{ width: "45px", height: "45px" }}
          onClick={() => navigate("/dashboard")}
          title="Go to Dashboard"
        />
      </header>

      <main className="movies-content">
        <h2 className="movies-page-title display-6 fw-bold mb-4">Entertainment according to your choice</h2>

        {loading ? (
          <div className="movies-loading-state text-center py-5 text-secondary fs-5">Loading your personalized movie recommendations...</div>
        ) : (
          <div className="movies-category-list d-flex flex-column gap-5">
            {categories.map((category) => {
              const movies = moviesData[category] || [];
              return (
                <div key={category} className="category-movies-row-container">
                  <h3 className="category-row-title h3 fw-bold text-success mb-3">{category}</h3>
                  <div className="row row-cols-2 row-cols-md-4 g-4">
                    {movies.length > 0 ? (
                      movies.slice(0, 4).map((movie) => (
                        <div className="col" key={movie.imdbID}>
                          <MovieCard
                            movie={movie}
                            onClick={() => setSelectedMovieId(movie.imdbID)}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-12">
                        <p className="no-movies-fallback text-secondary">No movies found for this category.</p>
                      </div>
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
