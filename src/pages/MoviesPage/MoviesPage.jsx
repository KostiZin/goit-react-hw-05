import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { fetchSearchMovie } from "../../services/api";
import { Hourglass } from "react-loader-spinner";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    const getData = async () => {
      const data = await fetchSearchMovie(query);

      setMovies(data);
      setIsLoading(false);
    };
    getData();
  }, [query]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }

    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  if (isLoading) {
    <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{ marginTop: "50px" }}
      wrapperClass=""
      colors={["#306cce", "#72a1ed"]}
    />;
  }

  return (
    <div>
      <h2>Search your movie </h2>

      <SearchForm handleChangeQuery={handleChangeQuery} />

      {query !== "" && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
