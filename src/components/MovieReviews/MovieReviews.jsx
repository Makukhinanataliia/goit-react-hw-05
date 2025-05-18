import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieReviews(movieId)
      .then((data) => setReviews(data))
      .catch(() => setError("Failed to load reviews"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <ul className={styles.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.reviewItem}>
          <h4>Author: {review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
