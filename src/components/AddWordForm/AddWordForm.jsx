import { useId, useState } from "react";
import CategoriesList from "../CategoriesList/CategoriesList";
import css from "./AddWordForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import addWordSchema from "./validation.js";
import { useDispatch } from "react-redux";
import { createWord, getStatistics } from "../../redux/words/operations.js";

export default function AddWordForm({ closeModal }) {
  const [category, setCategory] = useState("");
  const [verbType, setVerbType] = useState("regular");
  const [categoryError, setCategoryError] = useState(false);
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

  const handleChangeCategory = (value) => {
    setCategory(value);
    setCategoryError(false);
  };
  const onSubmit = (data) => {
    if (!category) {
      setCategoryError(true);
      return;
    }

    const formattedData = {
      en: data.en.trim(),
      ua: data.ua.trim(),
      category: category,
      ...(category === "verb" && {
        isIrregular: verbType === "irregular",
      }),
    };

    dispatch(createWord(formattedData));
    reset();
    setCategory("");
    setVerbType("regular");
    setCategoryError(false);
    closeModal();
  };
  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <CategoriesList
        variant="form"
        category={category}
        type={verbType}
        handleChangeVerbType={(e) => setVerbType(e.target.value)}
        handleChangeCategory={handleChangeCategory}
        hasError={categoryError}
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
          placeholder="Enter the word"
          id={`ua-${id}`}
          className={`${css.input} ${errors.ua ? css.inputError : ""}`}
          {...register("ua")}
        />
        {errors.ua && <span className={css.error}>{errors.ua.message}</span>}
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
        {errors.en && <span className={css.error}>{errors.en.message}</span>}
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
  );
}
