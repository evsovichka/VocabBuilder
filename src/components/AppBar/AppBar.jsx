import clsx from "clsx";
import { useResizeWindow } from "../../utils/resizeWindow.js";
import Logo from "../Logo/Logo";
import Logout from "../Logout/Logout.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./AppBar.module.css";
import UserMenu from "../UserMenu/UserMenu.jsx";

export default function AppBar({ name = "User", onOpen }) {
  const isLogged = true;

  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;
  const isDesktop = sizeWindow >= 1440;

  return (
    <section className={clsx(css.section, !isLogged && css.unlogged)}>
      <Logo />
      {isDesktop && isLogged && <Navigation />}
      {isLogged && (
        <div className={css.wrap}>
          <UserMenu isMobile={isMobile} username={name} />
          {isDesktop ? (
            <Logout />
          ) : (
            <svg
              width={isMobile ? 32 : 40}
              height={isMobile ? 22 : 28}
              className={css.iconBurger}
              onClick={onOpen}
            >
              <use href="/icons/icons.svg#icon-burger" />
            </svg>
          )}
        </div>
      )}
    </section>
  );
}
