import { useId } from "react";
import CategoriesList from "../CategoriesList/CategoriesList";
import css from "./AddWordForm.module.css";

export default function AddWordForm() {
  const id = useId();
  return (
    <form className={css.form}>
      <CategoriesList
        variant="form"
        // category="verb"
        // type={"regular"}
        // handleChangeType={handleChangeType}
        // handleChangeCategory={handleChangeCategory}
      />
      <div className={css.inputWrap}>
        <div className={css.labelWrap}>
          <svg className={css.icon}>
            <use href="/icons/icons.svg#icon-ukraine" />
          </svg>
          <label htmlFor={`ua-${id}`}>Ukrainian</label>
        </div>
        <input
          type="text"
          placeholder="Введіть слово"
          id={`ua-${id}`}
          className={css.input}
        />
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
          className={css.input}
        />
      </div>
      <div className={css.btnWrap}>
        <button type="submit" className={`${css.btn} ${css.addBtn}`}>
          Add
        </button>
        <button type="button" className={`${css.btn} ${css.cancelBtn}`}>
          Cancel
        </button>
      </div>
    </form>
  );
}
