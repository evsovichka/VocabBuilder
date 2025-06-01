import Logo from "../Logo/Logo";
import css from "./AppBar.module.css";

export default function AppBar({ name = "User" }) {
  const isLogged = true;

  return (
    <section className={css.section}>
      <Logo />
      {isLogged && (
        <div className={css.userInfo}>
          <p className={css.userName}>{name}</p>
          <div>
            <svg width="20" height="20">
              <use href="/icons/icons.svg#icon-user" />
            </svg>
          </div>
          <svg width="32" height="22" className={css.iconBurger}>
            <use href="/icons/icons.svg#icon-burger" />
          </svg>
        </div>
      )}
    </section>
  );
}
