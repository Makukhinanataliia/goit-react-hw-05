import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTrendingMovies()
      .then((data) => setMovies(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
}
