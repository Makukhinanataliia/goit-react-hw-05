import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Outlet,
  NavLink,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Зберігаємо звідки прийшли (для Go back)
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch((err) => setError("Failed to fetch movie details"))
      .finally(() => setLoading(false));
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLink);
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <button type="button" onClick={handleGoBack} className={styles.goBackBtn}>
        &larr; Go back
      </button>

      <div className={styles.movieDetails}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <hr />

      <div className={styles.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink
              to="cast"
              state={{ from: backLink }}
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              state={{ from: backLink }}
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
