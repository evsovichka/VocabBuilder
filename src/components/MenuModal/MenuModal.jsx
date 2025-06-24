import { useResizeWindow } from "../../hooks/resizeWindow.js";
import Logout from "../Logout/Logout";
import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import css from "./MenuModal.module.css";
import ReactModal from "react-modal";
import { useModal } from "../../hooks/useModal.js";

export default function MenuModal({ name = "User" }) {
  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;
  const { isOpen, closeModal } = useModal();
  return (
    <ReactModal
      isOpen={isOpen("menu")}
      ariaHideApp={false}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={css.modal}
      style={{
        overlay: {
          backgroundColor: "rgba(60, 60, 60, 0.4)",
          zIndex: "999",
        },
      }}
    >
      <div className={css.topWrap}>
        <UserMenu isMobile={isMobile} username={name} className="modal" />
        <svg
          width={isMobile ? 32 : 40}
          height={isMobile ? 32 : 40}
          onClick={closeModal}
        >
          <use href="/icons/icons.svg#icon-Close" />
        </svg>
      </div>
      <div className={css.navigationWrap}>
        <Navigation />
        <Logout closeModal={closeModal} />
      </div>
    </ReactModal>
  );
}
