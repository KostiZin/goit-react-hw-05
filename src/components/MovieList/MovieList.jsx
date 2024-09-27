import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Link, NavLink, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    const getAllMovies = async () => {
      const data = await fetchMovies();

      setMovies(data);
    };
    getAllMovies();
  }, []);

  console.log(movies);

  return (
    <div className={s.wrapper}>
      <ul className={s.ul}>
        {movies.map((movie) => (
          <li key={movie.id} className={s.li}>
            <NavLink
              className={s.linkWrapper}
              to={
                location.pathname === "/movies"
                  ? `${movie.id.toString()}`
                  : `movies/${movie.id.toString()}`
              }
            >
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
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
