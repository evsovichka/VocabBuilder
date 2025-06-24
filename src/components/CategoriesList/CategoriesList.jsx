import css from "./CategoriesList.module.css";
import { useSelector } from "react-redux";
import { selectCategoriesItems } from "../../redux/categories/selectors.js";
import clsx from "clsx";

export default function CategoriesList({
  category,
  type,
  handleChangeType,
  handleChangeCategory,
  variant,
}) {
  const categories = useSelector(selectCategoriesItems);

  return (
    <div className={css.wrap}>
      <div className={clsx(css.selectWrapper, css[`${variant}SelectWrapper`])}>
        <select
          className={clsx(css.select, css[`${variant}Select`])}
          value={category}
          onChange={handleChangeCategory}
        >
          <option value="">Categories</option>
          {categories.map((category, index) => {
            return (
              <option value={category.toLowerCase()} key={index}>
                {category}
              </option>
            );
          })}
        </select>
        <svg className={clsx(css.selectIcon, css[`${variant}SelectIcon`])}>
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
