import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import MovieCast from "../../components/MovieCast/MovieCast";

const MovieDetailsPage = () => {
  // Helps us to get the ID of a specific item (movie)
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieDetails(movieId);

      setMovie(data);
      // console.log(data);
    };
    getData();
  }, [movieId]);

  // console.log(movie);

  if (!movie) return <h2>Loading...</h2>;

  const { original_title, overview, vote_average, genres, poster_path } = movie;

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movie" />
      <h2>{original_title}</h2>
      <p>{vote_average}</p>
      <p>{overview}</p>
      <div>
        Genres:{" "}
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <hr />
        <p>Additional info</p>
        <div>
          <NavLink to="cast">Cast</NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </div>
        <hr />
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
