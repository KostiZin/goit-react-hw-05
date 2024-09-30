import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGExMDgyZjFkY2I1ZGNmNDQ3ZWMzZjM4ZTQ5NjZkOSIsIm5iZiI6MTcyNzMwNzUyMS4wOTQ3NDUsInN1YiI6IjY2ZjFlYTFhZmMwMDk4MzkxNDhkNTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.16xjBjk7o39pVBg5kswWUO1pCCHo2LSX-LuEgMNERwo",
  },
};

const urlTrendingMovies = `trending/movie/week?language=en-US`;

export const fetchMovies = async () => {
  const results = await axios
    .get(urlTrendingMovies, options)
    .then((resp) => resp.data.results)
    .catch((err) => console.error(err));

  return results;
};

export const fetchMovieDetails = async (movieId) => {
  const details = await axios
    .get(`movie/${movieId}?language=en-US`, options)
    .then((resp) => resp.data)
    .catch((err) => console.error(err));
  return details;
};

export const fetchMovieCredits = async (movieId) => {
  const credits = await axios
    .get(`movie/${movieId}/credits`, options)
    .then((resp) => resp.data.cast)
    .catch((err) => console.log(err));

  return credits;
};

export const fetchMovieReview = async (movieId) => {
  const reviews = await axios
    .get(`movie/${movieId}/reviews`, options)
    .then((resp) => resp.data.results)
    .catch((err) => console.log(err));

  return reviews;
};

export const fetchSearchMovie = async (query) => {
  const filteredMovies = await axios
    .get(`search/movie?query=${query}&include_adult=false&page=1`, options)
    .then((resp) => resp.data.results)
    .catch((err) => console.log(err));

  return filteredMovies;
};
