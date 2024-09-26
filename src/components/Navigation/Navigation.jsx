import React from "react";
import { NavLink, Route } from "react-router-dom";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import HomePage from "../../pages/HomePage/HomePage";
import clsx from "clsx";
import css from "./Navigation.module.css";
import MovieList from "../MovieList/MovieList";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.activeLink);
};

const Navigation = () => {
  return (
    <div className={css.wrapper}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={buildLinkClass}>
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
