import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieCredits(movieId);

      setCast(data);
      console.log(data);
    };
    getData();
  }, [movieId]);

  if (!cast) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
            />
            {actor.original_name}
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
