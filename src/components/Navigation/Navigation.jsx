import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  return (
    <nav className={css.navList}>
      <NavLink
        to="/dictionary"
        className={(props) => {
          return clsx(props.isActive && css.activeLink);
        }}
      >
        Dictionary
      </NavLink>
      <NavLink
        to="/recommend"
        className={(props) => {
          return clsx(props.isActive && css.activeLink);
        }}
      >
        Recommend
      </NavLink>
      <NavLink
        to="/training"
        className={(props) => {
          return clsx(props.isActive && css.activeLink);
        }}
      >
        Training
      </NavLink>
    </nav>
  );
}
