import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";
import s from "./MovieCast.module.css";
import { Hourglass } from "react-loader-spinner";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);

    const getData = async () => {
      const data = await fetchMovieCredits(movieId);
      setCast(data);

      setIsLoading(false);
    };

    getData();
  }, [movieId]);

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

  if (!cast) return;

  return cast?.length === 0 ? (
    <p className={s.pReviews}>There is no information about the cast</p>
  ) : (
    <div>
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
    </div>
  );
};

export default MovieCast;
