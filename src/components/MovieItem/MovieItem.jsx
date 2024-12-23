import { Link, useLocation } from "react-router-dom";
import defaultPoster from "../../images/no_image_poster.png";
import css from "./MovieItem.module.css";

const MovieItem = ({ id, title, poster, vote }) => {
  const location = useLocation();

  return (
    <li className={css.item} id={id}>
      <Link to={`/movies/${id}`} state={location}>
        <img
          className={css.image}
          src={
            poster ? `https://image.tmdb.org/t/p/w300/${poster}` : defaultPoster
          }
          alt={title}
          loading="lazy"
        />
      </Link>
      <h2 className={css.title}>{title}</h2>
      <p className={css.rate}>Rating: {vote}</p>
    </li>
  );
};

export default MovieItem;
