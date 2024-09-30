import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReview } from "../../services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReview] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const getData = async () => {
      const data = await fetchMovieReview(movieId);

      setReview(data);
    };
    getData();
  }, [movieId]);

  return (
    <div>
      {reviews?.length === 0 ? (
        <p className={s.pReviews}>There are no reviews yet</p>
      ) : (
        <ul className={s.ul}>
          {reviews.map((review) => (
            <li className={s.li} key={review.id}>
              {review.content}
              <p className={s.pAuthor}>Author: {review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
