import { NavLink, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  if (!movies) return;

  if (movies?.length === 0)
    return <h3>The movie you are searching is not here :/ </h3>;

  return (
    <div>
      <ul className={s.ul}>
        {movies?.map((movie) => (
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
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
