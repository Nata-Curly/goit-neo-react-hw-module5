import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import { getMovie } from "../../api/movies";
import css from './MovieDetailsPage.module.css'

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state);

  // const getActiveClass = ({ isActive }) => {
  //   return isActive ? css.active : "";
  // };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovie(movieId);
        setMovie(res);
      } catch (error) {
        console.log(error.message);
      }
    };
    movieId && fetchMovie();
  }, [movieId]);

  return (
    <div>
      {movie && (
        <div className={css.container}>
          <Link to={backLink.current ?? "/movies"}>Go back</Link>
          <Movie movie={movie} />
        </div>
      )}
      <ul className={css.list}>
        <li className={css.link}>
          <Link to="cast">
          {/* <Link className={getActiveClass} to="cast"> */}
            Cast
          </Link>
        </li>
        <li className={css.link}>
          <Link to="reviews">
          {/* <Link className={getActiveClass} to="reviews"> */}
            Reviews
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MovieDetailsPage;
