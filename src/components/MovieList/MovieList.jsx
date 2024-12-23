import MovieItem from "../MovieItem/MovieItem";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <ul className={css.list}>
      {movies?.map(({ id, title, poster_path, vote_average }) => (
        <MovieItem
          key={id}
          id={id}
          title={title}
          poster={poster_path}
          vote={vote_average.toFixed(1)}
        />
      ))}
    </ul>
  );
};

export default MovieList;
