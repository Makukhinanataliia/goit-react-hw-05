import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import Loader from "../Loader/Loader";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieCast(movieId)
      .then((data) => setCast(data))
      .catch(() => setError("Failed to load cast"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/100x150?text=No+Image"
            }
            alt={actor.name}
            className={styles.actorPhoto}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
