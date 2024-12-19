import defaultPoster from "../../images/no_image_poster.png";
import css from './Movie.module.css'

const Movie = ({ movie }) => {

  const { title, overview, poster_path, vote_average, homepage, genres } = movie;
  
    return (
      <div className={css.item}>
        <img
          className={css.itemImg}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300/${poster_path}`
              : defaultPoster
          }
          alt={title}
          loading="lazy"
        />
        <div className={css.itemDescription}>
          <h2>{title}</h2>
          <h3>Overview</h3>
          <p>{overview}</p>
          <p>Rate: {vote_average.toFixed(1)}</p>
          <h3>Genres</h3>
          <ul>
            <li key={"genres"}>
              {genres?.map((genre) => genre.name).join(", ")}
            </li>
          </ul>
          {homepage && (
            <a href={homepage} target="_blank" rel="noreferrer">
              <p>Official page</p>
            </a>
          )}
        </div>
      </div>
    );
};
export default Movie;
