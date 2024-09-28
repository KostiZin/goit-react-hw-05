import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  // Helps us to get the ID of a specific item (movie)
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  //LOCATION
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieDetails(movieId);

      setMovie(data);
    };
    getData();
  }, [movieId]);

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
      <Link to={goBackRef.current}>Go back</Link>

      <div className={s.movieWrapper}>
        <img
          className={s.img}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : defaultImg
          }
          alt={poster_path ? original_title : "poster"}
        />
        <div className={s.infoWrapper}>
          <h2>{original_title}</h2>
          <p>Realese date: {release_date}</p>
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
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
