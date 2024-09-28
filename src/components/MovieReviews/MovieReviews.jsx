import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieReview } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReview] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const getData = async () => {
      const data = await fetchMovieReview(movieId);

      setReview(data);
      console.log(data);
    };
    getData();
  }, [movieId]);

  if (!reviews) return <p>No reviews yet</p>;

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.content}
            <p>Author: {review.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
