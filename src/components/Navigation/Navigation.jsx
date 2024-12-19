import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  const getActiveClass = ({ isActive }) => {
    return isActive ? css.active : "";
  };
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.headerList}>
          <li className={css.link}>
            <NavLink className={getActiveClass} to="/">
              Home
            </NavLink>
          </li>
          <li className={css.link}>
            <NavLink className={getActiveClass} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
