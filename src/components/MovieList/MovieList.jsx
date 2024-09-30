import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { NavLink, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import { Hourglass } from "react-loader-spinner";

const MovieList = ({ movies }) => {
  const [trendMovies, setTrendMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    setIsLoading(true);
    const getAllMovies = async () => {
      const data = await fetchMovies();
      setTrendMovies(data);
      setIsLoading(false);
    };
    getAllMovies();
  }, []);

  const displayedMovies = movies ? movies : trendMovies;

  if (isLoading)
    return (
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{ marginTop: "50px" }}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    );

  if (!displayedMovies) return;

  if (displayedMovies?.length === 0)
    return <h3>The movie you are searching is not here :/ </h3>;

  return (
    <div>
      <ul className={s.ul}>
        {displayedMovies?.map((movie) => (
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
