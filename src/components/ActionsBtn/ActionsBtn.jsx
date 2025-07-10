import { useState } from "react";
import css from "./ActionsBtn.module.css";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteWord } from "../../redux/words/operations.js";

export default function ActionsBtn({ data }) {
  const { _id } = data;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(deleteWord(_id));
    setIsOpen(false);
  };
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
          <li className={css.popUpItem} onClick={() => handleDelete(_id)}>
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
