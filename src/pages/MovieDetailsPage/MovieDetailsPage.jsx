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
import { MdArrowBackIos } from "react-icons/md";

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
      {/* <div className={s.linkBtn}> */}
      <NavLink className={s.linkBtn} to={goBackRef.current}>
        <MdArrowBackIos />
        Go back
      </NavLink>
      {/* </div> */}

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
          <p className={s.pOverview}>{overview}</p>
          {genres?.length !== 0 && (
            <div className={s.divGenres}>
              Genres:{" "}
              <ul className={s.ul}>
                {/* Genres */}
                {genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <hr />
        <p className={s.pInfo}>Additional info</p>
        <hr />
        <div className={s.linkWrapper}>
          <NavLink className={s.link} to="cast">
            Cast
          </NavLink>
          <NavLink className={s.link} to="reviews">
            Reviews
          </NavLink>
        </div>

        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
