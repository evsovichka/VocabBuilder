import { useModal } from "../../hooks/useModal.js";
import ReactModal from "react-modal";
import css from "./EditWordModal.module.css";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import addWordSchema from "../AddWordForm/validation.js";

export default function EditWordModal() {
  const { isOpen, closeModal } = useModal();
  const id = useId();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addWordSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const formattedData = {
      en: data.en.trim(),
      ua: data.ua.trim(),
    };
    console.log(formattedData);
    dispatch();
    reset();
    closeModal();
  };
  return (
    <ReactModal
      isOpen={isOpen("editWord")}
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
      <div>
        <svg className={css.iconClose} onClick={closeModal}>
          <use href="/icons/icons.svg#icon-Close" />
        </svg>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputWrap}>
            <div className={css.labelWrap}>
              <svg className={css.icon}>
                <use href="/icons/icons.svg#icon-ukraine" />
              </svg>
              <label htmlFor={`ua-${id}`}>Ukrainian</label>
            </div>
            <input
              type="text"
              placeholder="Enter the word"
              id={`ua-${id}`}
              className={`${css.input} ${errors.ua ? css.inputError : ""}`}
              {...register("ua")}
            />
            {errors.ua && (
              <span className={css.error}>{errors.ua.message}</span>
            )}
          </div>
          <div className={css.inputWrap}>
            <div className={css.labelWrap}>
              <svg className={css.icon}>
                <use href="/icons/icons.svg#icon-united-kingdom" />
              </svg>
              <label htmlFor={`en-${id}`}>English</label>
            </div>
            <input
              type="text"
              placeholder="Enter the word"
              id={`en-${id}`}
              className={`${css.input} ${errors.en ? css.inputError : ""}`}
              {...register("en")}
            />
            {errors.en && (
              <span className={css.error}>{errors.en.message}</span>
            )}
          </div>
          <div className={css.btnWrap}>
            <button type="submit" className={`${css.btn} ${css.addBtn}`}>
              Add
            </button>
            <button
              type="button"
              className={`${css.btn} ${css.cancelBtn}`}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
