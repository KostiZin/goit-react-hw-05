import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
// import MoviesPage from "./pages/MoviesPage/MoviesPage";
import Navigation from "./components/Navigation/Navigation";
import { lazy, Suspense } from "react";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
// import MovieCast from "./components/MovieCast/MovieCast";
// import MovieReviews from "./components/MovieReviews/MovieReviews";

const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<h2>Loading by suspense</h2>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

// API 04a1082f1dcb5dcf447ec3f38e4966d9

//API Read Access Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGExMDgyZjFkY2I1ZGNmNDQ3ZWMzZjM4ZTQ5NjZkOSIsIm5iZiI6MTcyNzIyMTY1Ny4zMzE5OTUsInN1YiI6IjY2ZjFlYTFhZmMwMDk4MzkxNDhkNTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TC9jbve1FrZyPdUVHxdoIxhOWV8t3baiflgNFor5xUo
