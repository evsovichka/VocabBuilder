import { useDispatch } from "react-redux";
import css from "./Logout.module.css";
import { logOut } from "../../redux/auth/operations.js";

export default function Logout() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
  };
  return (
    <button className={css.button} onClick={handleClick}>
      Log out
      <svg width="16" height="16">
        <use href="/icons/icons.svg#icon-arrow-right" />
      </svg>
    </button>
  );
}
