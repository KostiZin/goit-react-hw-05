import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReview } from "../../services/api";
import s from "./MovieReviews.module.css";
import { Hourglass } from "react-loader-spinner";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);

    const getData = async () => {
      const data = await fetchMovieReview(movieId);

      setReview(data);
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

  if (!reviews) return;

  return reviews?.length === 0 ? (
    <p className={s.pReviews}>There are no reviews yet</p>
  ) : (
    <div>
      <ul className={s.ul}>
        {reviews.map((review) => (
          <li className={s.li} key={review.id}>
            {review.content}
            <p className={s.pAuthor}>Author: {review.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
