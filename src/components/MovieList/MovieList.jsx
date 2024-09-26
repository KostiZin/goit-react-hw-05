import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getAllMovies = async () => {
      const data = await fetchMovies();

      setMovies(data);
    };
    getAllMovies();
  }, []);

  // return (
  //   <div>
  //     <ul>
  //       {movies.map((movie) => (
  //         <li key={movie.id}>{movie.original_title}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={movie.id.toString()}>
              <p>{movie.original_title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
