import { useState } from "react";
import css from "./CategoriesList.module.css";
import { useSelector } from "react-redux";
import { selectCategoriesItems } from "../../redux/categories/selectors.js";

export default function CategoriesList() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("regular");

  const categories = useSelector(selectCategoriesItems);

  const handleChange = (evt) => setCategory(evt.target.value);
  const handleVerbTypeChange = (evt) => {
    setType(evt.target.value);
  };

  return (
    <div className={css.wrap}>
      <select className={css.select} value={category} onChange={handleChange}>
        <option value="">Categories</option>
        {categories.map((category, index) => {
          return (
            <option value={category.toLowerCase()} key={index}>
              {category}
            </option>
          );
        })}
      </select>
      <svg className={css.selectIcon}>
        <use href="/icons/icons.svg#icon-arrow-down" />
      </svg>
      {category === "verb" && (
        <div className={css.radioWrap}>
          <label className={css.radio}>
            <input
              type="radio"
              name="verbType"
              value="regular"
              checked={type === "regular"}
              onChange={handleVerbTypeChange}
            />
            <span className={css.customRadio}></span>
            Regular
          </label>
          <label className={css.radio}>
            <input
              type="radio"
              name="verbType"
              value="irregular"
              checked={type === "irregular"}
              onChange={handleVerbTypeChange}
            />
            <span className={css.customRadio}></span>
            Irregular
          </label>
        </div>
      )}
    </div>
  );
}
