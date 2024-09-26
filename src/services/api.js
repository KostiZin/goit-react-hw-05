import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGExMDgyZjFkY2I1ZGNmNDQ3ZWMzZjM4ZTQ5NjZkOSIsIm5iZiI6MTcyNzMwNzUyMS4wOTQ3NDUsInN1YiI6IjY2ZjFlYTFhZmMwMDk4MzkxNDhkNTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.16xjBjk7o39pVBg5kswWUO1pCCHo2LSX-LuEgMNERwo",
  },
};

const urlTrendingMovies = `3/trending/movie/week?language=en-US`;

// const urlMovieDetails = `3/movie/${movieId}?language=en-US`;

// export const fetchMovies = async () => {
//   const { data } = await axios.get("results");
//   console.log(data);
//   return data.results;
// };

export const fetchMovies = async () => {
  const results = await axios
    .get(urlTrendingMovies, options)
    .then((resp) => resp.data.results)
    .catch((err) => console.error(err));

  return results;
};

export const fetchMovieDetails = async (movieId) => {
  const details = await axios
    .get(`3/movie/${movieId}?language=en-US`, options)
    .then((resp) => resp.data)
    .catch((err) => console.error(err));
  console.log(details);
  return details;
};

// fetchMovieDetails(698687);
