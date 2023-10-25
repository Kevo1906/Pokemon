import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";
import { FaSignOutAlt } from "react-icons/fa";

function Nav({ logout }) {
  return (
    <div className={style.nav}>
      <SearchBar className={style.searchbar} />

      <NavLink
        to={"/about"}
        className={({ isActive }) => (isActive ? style.activeLink : null)}
      >
        <button className={style.tabs}>About </button>
      </NavLink>
      <NavLink
        to={"/home"}
        className={({ isActive }) => (isActive ? style.activeLink : null)}
      >
        <button className={style.tabs}>Home</button>
      </NavLink>

      <NavLink
        to={"/createPokemon"}
        className={({ isActive }) => (isActive ? style.activeLink : null)}
      >
        <button className={style.tabs}>Create Pokemon</button>
      </NavLink>

      <button onClick={logout} className={style.logoutbutton}>
        <div className={style.sign}>
          <FaSignOutAlt className={style.svg} />
        </div>
        <div className={style.text}>Logout</div>
      </button>
    </div>
  );
}

export default Nav;
