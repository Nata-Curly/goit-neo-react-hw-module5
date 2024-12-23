import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/movies";
import defaultPoster from "../../images/no_image_poster.png";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const toastDisplayed = useRef(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const res = await getMovieCast(movieId);
        setCast(res.cast);
        if (res.cast.length === 0 && !toastDisplayed.current) {
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
    fetchCast();
  }, [movieId]);

  useEffect(() => {
    if (cast.length > 0) {
      window.scrollBy({
        top: 600,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [cast]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Cast</h2>
      {cast && (
        <ul className={css.list}>
          {cast.map(({ id, name, profile_path, character }) => (
            <li key={id} className={css.item}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                    : defaultPoster
                }
                alt={name}
                className={css.img}
                loading="lazy"
              />
              {name && <p className={css.name}>Name: {name}</p>}
              {character && <p className={css.name}>Character: {character}</p>}
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

export default MovieCast;
