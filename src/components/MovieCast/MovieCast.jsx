import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    if (!movieId) return;

    const getData = async () => {
      const data = await fetchMovieCredits(movieId);

      setCast(data);
    };
    getData();
  }, [movieId]);

  console.log(cast);

  // if (!cast) return <p>Loading...</p>;

  return (
    <div>
      {cast?.length === 0 ? (
        <p className={s.pReviews}>There is no information about the cast</p>
      ) : (
        <ul className={s.ul}>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                className={s.img}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.profile_path ? actor.name : "poster"}
              />
              <p>{actor.original_name}</p>

              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
