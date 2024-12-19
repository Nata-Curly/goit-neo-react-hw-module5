import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../api/movies";
import css from './HomePage.module.css';
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await getTrendingMovies();
        setTrendingMovies(res.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={trendingMovies} />
      {loading && <Loader />}
      {!loading && error && (
      <ErrorMessage message={"Oops, something went wrong... Please reload!"} />
      )}
    </div>
  );
};

export default HomePage;
