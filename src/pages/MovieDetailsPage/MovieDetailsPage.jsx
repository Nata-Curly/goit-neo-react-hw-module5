import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import { getMovie } from "../../api/movies";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await getMovie(movieId);
        setMovie(res);
      } catch (error) {
        toast.error(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    movieId && fetchMovie();
  }, [movieId]);

  return (
    <main>
      {movie && (
        <div className={css.container}>
          <Link to={backLink.current ?? "/movies"} className={css.backLink}>
            Go back
          </Link>
          <Movie movie={movie} />
        </div>
      )}
      <ul className={css.list}>
        <li className={css.link}>
          <Link to="cast">Cast</Link>
        </li>
        <li className={css.link}>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      {loading && <Loader />}
      {!loading && error && (
        <ErrorMessage
          message={"Oops, something went wrong... Please reload!"}
        />
      )}
    </main>
  );
};

export default MovieDetailsPage;
