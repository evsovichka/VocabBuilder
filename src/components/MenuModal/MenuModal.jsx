import { useResizeWindow } from "../../utils/resizeWindow";
import Logout from "../Logout/Logout";
import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import css from "./MenuModal.module.css";
import ReactModal from "react-modal";

export default function MenuModal({ onClose, isOpen, name = "User" }) {
  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onClose}
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
          onClick={onClose}
        >
          <use href="/icons/icons.svg#icon-Close" />
        </svg>
      </div>
      <div className={css.navigationWrap}>
        <Navigation />
        <Logout />
      </div>
    </ReactModal>
  );
}
