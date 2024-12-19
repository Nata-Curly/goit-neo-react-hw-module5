import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage";
// import MoviesPage from "./pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);

import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />}></Route>
            <Route path="reviews" element={<MovieReviews />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
