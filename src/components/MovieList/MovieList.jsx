import { useEffect, useMemo, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Link, NavLink, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const [trendMovies, setTrendMovies] = useState([]);

  const location = useLocation();

  //LOCATION

  // console.log(location);
  // console.log(location.pathname);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const getAllMovies = async () => {
      const data = await fetchMovies();

      setTrendMovies(data);
    };
    getAllMovies();
  }, []);

  // console.log(movies);
  // console.log(trendMovies);

  const displayedMovies = movies ? movies : trendMovies;

  if (!displayedMovies || displayedMovies.length === 0)
    return <p>No movies found</p>;

  return (
    <div className={s.wrapper}>
      <ul className={s.ul}>
        {displayedMovies.map((movie) => (
          <li key={movie.id} className={s.li}>
            <NavLink
              className={s.linkWrapper}
              to={
                location.pathname === "/movies"
                  ? `${movie.id.toString()}`
                  : `movies/${movie.id.toString()}`
              }
              state={location}
            >
              <img
                className={s.img}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.poster_path ? movie.original_title : "poster"}
              />
              <p className={s.title}>{movie.original_title}</p>
              {/* <p className={s.title}>
                {new Date(movie.release_date).getFullYear()}
              </p> */}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
