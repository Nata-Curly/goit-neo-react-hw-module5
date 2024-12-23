import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useEffect, useRef, useState } from "react";
import { searchMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const toastDisplayed = useRef(false);

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await searchMovies(query);
        setMovies(res.results);
        if (res.results.length === 0 && !toastDisplayed.current) {
          toast("Oops... There's no such movie", {
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
    fetchMovies();
  }, [searchParams]);

  const handleSearch = (query) => {
    setSearchParams({ query });
  };

  return (
    <main>
      <SearchForm onSearch={handleSearch} />
      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && <Loader />}
      {!loading && error && (
        <ErrorMessage
          message={"Oops, something went wrong... Please reload!"}
        />
      )}
    </main>
  );
};

export default MoviesPage;
