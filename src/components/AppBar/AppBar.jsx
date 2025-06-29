import clsx from "clsx";
import { useResizeWindow } from "../../hooks/resizeWindow.js";
import Logo from "../Logo/Logo";
import Logout from "../Logout/Logout.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./AppBar.module.css";
import UserMenu from "../UserMenu/UserMenu.jsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { useModal } from "../../hooks/useModal.js";

export default function AppBar({ name = "User" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;
  const isDesktop = sizeWindow >= 1440;
  const { openModal } = useModal();

  return (
    <section className={clsx(css.section, !isLoggedIn && css.unlogged)}>
      <Logo />
      {isDesktop && isLoggedIn && <Navigation />}
      {isLoggedIn && (
        <div className={css.wrap}>
          <UserMenu isMobile={isMobile} username={name} />
          {isDesktop ? (
            <Logout />
          ) : (
            <svg
              width={isMobile ? 32 : 40}
              height={isMobile ? 22 : 28}
              className={css.iconBurger}
              onClick={() => openModal("menu")}
            >
              <use href="/icons/icons.svg#icon-burger" />
            </svg>
          )}
        </div>
      )}
    </section>
  );
}
