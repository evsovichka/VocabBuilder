import { useResizeWindow } from "../../utils/resizeWindow";
import Logout from "../Logout/Logout";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./MenuModal.module.css";
import ReactModal from "react-modal";

export default function MenuModal({ onClose, name = "User" }) {
  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;
  return (
    <ReactModal
      isOpen={true}
      ariaHideApp={false}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={css.modal}
      style={{
        overlay: {
          backgroundColor: "rgba(60, 60, 60, 0.4)",
        },
      }}
    >
      <div className={css.topWrap}>
        <div className={css.userInfo}>
          <p className={css.userName}>{name}</p>
          <div>
            <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24}>
              <use href="/icons/icons.svg#icon-user" />
            </svg>
          </div>
        </div>
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
