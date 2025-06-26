import ReactModal from "react-modal";
import { useModal } from "../../hooks/useModal.js";
import css from "./AddWordModal.module.css";
import AddWordForm from "../AddWordForm/AddWordForm.jsx";

export default function AddWordModal() {
  const { isOpen, closeModal } = useModal();
  return (
    <ReactModal
      isOpen={isOpen("addWord")}
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
      <svg className={css.iconClose} onClick={closeModal}>
        <use href="/icons/icons.svg#icon-Close" />
      </svg>
      <div className={css.textWrap}>
        <p className={css.title}>Add word</p>
        <p>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
      </div>
      <AddWordForm closeModal={closeModal} />
    </ReactModal>
  );
}
