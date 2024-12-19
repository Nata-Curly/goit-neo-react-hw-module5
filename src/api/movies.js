import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODlkY2Y5YTdkZTllZjg2MzU1ZDYxMDM4MDY3OWE3NCIsIm5iZiI6MTY4ODY0OTI0Ni40ODg5OTk4LCJzdWIiOiI2NGE2YmUxZTcyNGRlMTAwYzVlOTliZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1-R02tgOZW-Quj8Xqlk0EEhK6b5SCAGIm64_wKreNQ0",
};

const searchMovies = async (query, page = 1) => {
  const { data } = await axios("search/movie", {
    headers,
    params: {
      query,
      page,
      language: "en-US",
    },
  });
  return data;
};

const getTrendingMovies = async (page = 1) => {
  const { data } = await axios("trending/movie/day", {
    headers,
    params: {
      language: "en-US",
      page,
    },
  });
  return data;
};

const getMovie = async (movie_id) => {
  const { data } = await axios(`movie/${movie_id}`, {
    headers,
    params: {
      language: "en-US",
    },
  });
  return data;
};

const getMovieCast = async (movie_id) => {
  const { data } = await axios(`movie/${movie_id}/credits`, {
    headers,
    params: {
      language: "en-US",
    },
  });
  return data;
};

const getMovieReviews = async (movie_id, page = 1) => {
  const { data } = await axios(`movie/${movie_id}/reviews`, {
    headers,
    params: {
      page,
      language: "en-US",
    },
  });
  return data;
};

export {
  searchMovies,
  getTrendingMovies,
  getMovie,
  getMovieCast,
  getMovieReviews,
};
