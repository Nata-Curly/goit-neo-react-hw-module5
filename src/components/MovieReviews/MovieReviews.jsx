import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/movies";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const toastDisplayed = useRef(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await getMovieReviews(movieId);
        setReviews(res.results);
        if (res.results.length === 0 && !toastDisplayed.current) {
          toast("Oops... There's no reviews", {
            icon: "😳",
          });
          toastDisplayed.current = true;
        }
      } catch (error) {
        toast.error(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  useEffect(() => {
    if (reviews.length > 0) {
      window.scrollBy({
        top: 600,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [reviews]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Reviews</h2>
      {reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              {author && <p className={css.author}>Author: {author}</p>}
              {content && <p className={css.text}>Review: {content}</p>}
            </li>
          ))}
        </ul>
      )}
      {loading && <Loader />}
      {!loading && error && (
        <ErrorMessage
          message={"Oops, something went wrong... Please reload!"}
        />
      )}
    </div>
  );
};

export default MovieReviews;
