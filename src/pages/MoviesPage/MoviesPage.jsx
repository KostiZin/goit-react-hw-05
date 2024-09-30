import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { fetchSearchMovie } from "../../services/api";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      const data = await fetchSearchMovie(query);

      setMovies(data);
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

  console.log(movies);

  // if (!movies) return <p>NO</p>;

  return (
    <div>
      <h2>Search your movie </h2>

      <SearchForm handleChangeQuery={handleChangeQuery} />

      {query !== "" && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
