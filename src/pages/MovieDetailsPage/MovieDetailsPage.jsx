import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import MovieCast from "../../components/MovieCast/MovieCast";
import s from "./MovieDetailsPage.module.css";

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

  //   const location = useLocation();
  // const backLink = useRef(location.state ?? '/movies');

  if (!movie) return <h2>Loading...</h2>;

  const {
    original_title,
    overview,

    genres,
    poster_path,
    release_date,
  } = movie;

  return (
    <div>
      <button>Go back</button>
      <div className={s.movieWrapper}>
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="movie"
        />
        <div className={s.infoWrapper}>
          <h2>{original_title}</h2>
          <p>Realese date: {release_date}</p>
          {/* <p>{vote_average}</p> */}
          <p>{overview}</p>
          <div>
            Genres:{" "}
            <ul>
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
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
