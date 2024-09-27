import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Link, useLocation } from "react-router-dom";

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
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {/* <Link to={movie.id.toString()}>
              <p>{movie.original_title}</p>
            </Link> */}
            <Link
              to={
                location.pathname === "/movies"
                  ? `${movie.id.toString()}`
                  : `movies/${movie.id.toString()}`
              }
            >
              <p>{movie.original_title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
