import css from "./CategoriesList.module.css";
import { useSelector } from "react-redux";
import { selectCategoriesItems } from "../../redux/categories/selectors.js";
import clsx from "clsx";
import { useState } from "react";
import { capitalize } from "../../utils/capitalize.js";

export default function CategoriesList({
  category,
  type,
  handleChangeVerbType,
  handleChangeCategory,
  variant,
  hasError,
}) {
  const categories = useSelector(selectCategoriesItems);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx(css.wrap, css[`${variant}Wrap`])}>
      <div className={clsx(css.selectWrapper, css[`${variant}SelectWrapper`])}>
        <div
          className={clsx(
            css.customSelect,
            css[`${variant}CustomSelect`],
            hasError ? css.errorInput : ""
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {capitalize(category) || "Categories"}
        </div>
        {isOpen && (
          <ul className={clsx(css.dropDown, css[`${variant}DropDown`])}>
            {categories.map((item, index) => {
              return (
                <li
                  key={index}
                  className={clsx(
                    css.item,
                    css[`${variant}Item`],
                    item === category && css.activeCategory
                  )}
                  onClick={() => {
                    handleChangeCategory(item.toLowerCase());
                    setIsOpen(false);
                  }}
                >
                  {capitalize(item)}
                </li>
              );
            })}
          </ul>
        )}
        <svg className={clsx(css.icon, css[`${variant}Icon`])}>
          <use href="/icons/icons.svg#icon-arrow-down" />
        </svg>
      </div>
      {category === "verb" && (
        <div className={clsx(css[`${variant}BottomWrap`])}>
          <div className={css.radioWrap}>
            <label className={clsx(css.radio, css[`${variant}Radio`])}>
              <input
                type="radio"
                name="verbType"
                value="regular"
                checked={type === "regular"}
                onChange={handleChangeVerbType}
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
                onChange={handleChangeVerbType}
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
      {hasError && <span className={css.error}>Please select a category.</span>}
    </div>
  );
}
