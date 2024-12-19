import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { searchMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await searchMovies(query);
        setMovies(res.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchParams]);

  const handleSearch = (query) => {
    setSearchParams({ query });
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {movies ? (
        <MovieList movies={movies} />
      ) : (
        <p>Oops, there`s no such movies</p>
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

export default MoviesPage;
