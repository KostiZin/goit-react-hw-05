import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../services/api";
import { Hourglass } from "react-loader-spinner";

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getAllMovies = async () => {
      const data = await fetchMovies();
      setTrendMovies(data);
      setIsLoading(false);
    };
    getAllMovies();
  }, []);

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

  return (
    <div>
      <h2>Trending movies this week</h2>
      <MovieList movies={trendMovies} />
    </div>
  );
};

export default HomePage;
