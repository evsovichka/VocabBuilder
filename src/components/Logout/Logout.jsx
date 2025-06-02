import css from "./Logout.module.css";

export default function Logout() {
  return (
    <button className={css.button}>
      Log out
      <svg width="16" height="16">
        <use href="/icons/icons.svg#icon-arrow-right" />
      </svg>
    </button>
  );
}
