import React, { useEffect, useMemo, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useParams, useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { fetchSearchMovie } from "../../services/api";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState([]);

  console.log(query);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      const data = await fetchSearchMovie(query);

      setMovies(data);
      console.log(data);
    };
    getData();
  }, [query]);

  console.log(movies);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }
    console.log(newQuery);
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  // if (!movies) return <p>NO</p>;

  return (
    <div>
      <h2>Search</h2>

      <SearchForm handleChangeQuery={handleChangeQuery} />
      {query !== "" && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
