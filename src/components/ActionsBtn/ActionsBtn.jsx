import { useState } from "react";
import css from "./ActionsBtn.module.css";
import { BsThreeDots } from "react-icons/bs";

export default function ActionsBtn({ data }) {
  const { _id } = data;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={css.wrap}>
      <BsThreeDots
        className={css.dotsIcon}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <ul className={css.popUp}>
          <li className={css.popUpItem}>
            <svg className={css.popUpIcon}>
              <use href="/icons/icons.svg#icon-edit" />
            </svg>
            Edit
          </li>
          <li className={css.popUpItem}>
            <svg className={css.popUpIcon}>
              <use href="/icons/icons.svg#icon-trash" />
            </svg>
            Delete
          </li>
        </ul>
      )}
    </div>
  );
}
