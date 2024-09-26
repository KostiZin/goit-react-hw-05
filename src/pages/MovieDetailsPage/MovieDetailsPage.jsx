import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";

const MovieDetailsPage = () => {
  // Helps us to get the ID of a specific item (movie)
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieDetails(movieId);

      setMovie(data);
      console.log(data);
    };
    getData();
  }, [movieId]);

  console.log(movie);

  if (!movie) return <h2>Loading...</h2>;

  const { original_title, overview, vote_average, genres } = movie;

  return (
    <div>
      {/* <img src="" alt="" /> */}
      <h2>{original_title}</h2>
      <p>{vote_average}</p>
      <p>{overview}</p>
      <div>
        Genres:{" "}
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Additional info</p>
        <p>Cast</p>
        <p>Reviews</p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
