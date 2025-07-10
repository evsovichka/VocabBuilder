import css from "./ActionsBtn.module.css";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteWord } from "../../redux/words/operations.js";
import { useEffect, useRef } from "react";

export default function ActionsBtn({ data, setOpenId, isOpen }) {
  const { _id } = data;
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(deleteWord(_id));
    setOpenId(null);
  };

  const togglePopUp = () => {
    setOpenId((prev) => (prev === _id ? null : _id));
  };
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.wrap} ref={selectRef}>
      <BsThreeDots className={css.dotsIcon} onClick={togglePopUp} />
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
