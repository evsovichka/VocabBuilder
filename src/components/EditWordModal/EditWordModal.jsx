import { useModal } from "../../hooks/useModal.js";
import ReactModal from "react-modal";
import css from "./EditWordModal.module.css";
import { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import addWordSchema from "../AddWordForm/validation.js";
import { resetSelectedWord } from "../../redux/SelectedWord/slice.js";
import { selectEditedWord } from "../../redux/SelectedWord/selectors.js";
import { editWord } from "../../redux/words/operations.js";

export default function EditWordModal() {
  const { isOpen, closeModal } = useModal();
  const id = useId();
  const dispatch = useDispatch();
  const selectedWord = useSelector(selectEditedWord);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addWordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedWord) {
      reset({
        ua: selectedWord.ua,
        en: selectedWord.en,
      });
    }
  }, [reset, selectedWord]);

  const onSubmit = (data) => {
    const formattedData = {
      en: data.en.trim(),
      ua: data.ua.trim(),
      id: selectedWord.id,
      category: selectedWord.category,
      ...(selectedWord.category === "verb" && {
        isIrregular: selectedWord.isIrregular,
      }),
    };
    dispatch(editWord(formattedData));
    dispatch(resetSelectedWord());
    reset();
    closeModal();
  };

  const handleCloseModal = () => {
    dispatch(resetSelectedWord());
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
        <svg className={css.iconClose} onClick={handleCloseModal}>
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
            <button type="submit" className={`${css.btn} ${css.saveBtn}`}>
              Save
            </button>
            <button
              type="button"
              className={`${css.btn} ${css.cancelBtn}`}
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
