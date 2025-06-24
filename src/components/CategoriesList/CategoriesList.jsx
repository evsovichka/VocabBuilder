import css from "./CategoriesList.module.css";
import { useSelector } from "react-redux";
import { selectCategoriesItems } from "../../redux/categories/selectors.js";
import clsx from "clsx";
import { useState } from "react";
import { capitalize } from "../../utils/capitalize.js";

export default function CategoriesList({
  // category,
  // type,
  // handleChangeType,
  // handleChangeCategory,
  variant,
}) {
  const categories = useSelector(selectCategoriesItems);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState("regular");

  const handleChangeType = (evt) => {
    setType(evt.target.value);
  };

  return (
    <div className={css.wrap}>
      <div className={css.selectWrapper}>
        <div
          className={clsx(css.customSelect, css[`${variant}CustomSelect`])}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {capitalize(selectedCategory) || "Categories"}
        </div>
        {isOpen && (
          <ul className={clsx(css.dropDown, css[`${variant}DropDown`])}>
            {categories.map((category, index) => {
              return (
                <li
                  key={index}
                  className={clsx(
                    css.item,
                    css[`${variant}Item`],
                    category === selectedCategory && css.activeCategory
                  )}
                  onClick={() => {
                    setSelectedCategory(category.toLowerCase());
                    setIsOpen(false);
                  }}
                >
                  {capitalize(category)}
                </li>
              );
            })}
          </ul>
        )}
        <svg className={clsx(css.icon, css[`${variant}Icon`])}>
          <use href="/icons/icons.svg#icon-arrow-down" />
        </svg>
      </div>
      {selectedCategory === "verb" && (
        <div className={clsx(css[`${variant}BottomWrap`])}>
          <div className={css.radioWrap}>
            <label className={clsx(css.radio, css[`${variant}Radio`])}>
              <input
                type="radio"
                name="verbType"
                value="regular"
                checked={type === "regular"}
                onChange={handleChangeType}
              />
              <span
                className={clsx(css.customRadio, css[`${variant}CustomRadio`])}
              ></span>
              Regular
            </label>
            <label className={clsx(css.radio, css[`${variant}Radio`])}>
              <input
                type="radio"
                name="verbType"
                value="irregular"
                checked={type === "irregular"}
                onChange={handleChangeType}
              />
              <span
                className={clsx(css.customRadio, css[`${variant}CustomRadio`])}
              ></span>
              Irregular
            </label>
          </div>
          {type === "irregular" && variant === "form" && (
            <p className={css.text}>
              Such data must be entered in the format I form-II form-III form.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
