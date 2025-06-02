import { useResizeWindow } from "../../utils/resizeWindow.js";
import Logo from "../Logo/Logo";
import css from "./AppBar.module.css";

export default function AppBar({ name = "User" }) {
  const isLogged = true;

  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;

  return (
    <section className={css.section}>
      <Logo />
      {isLogged && (
        <div className={css.userInfo}>
          <p className={css.userName}>{name}</p>
          <div>
            <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24}>
              <use href="/icons/icons.svg#icon-user" />
            </svg>
          </div>
          <svg
            width={isMobile ? 32 : 40}
            height={isMobile ? 22 : 28}
            className={css.iconBurger}
          >
            <use href="/icons/icons.svg#icon-burger" />
          </svg>
        </div>
      )}
    </section>
  );
}
