import css from "./ActionsBtn.module.css";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteWord } from "../../redux/words/operations.js";
import { useEffect, useRef } from "react";
import { useModal } from "../../hooks/useModal.js";
import { setSelectedWord } from "../../redux/SelectedWord/slice";

export default function ActionsBtn({ data, setOpenId, isOpen }) {
  const { _id } = data;
  const dispatch = useDispatch();
  const { openModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteWord(_id));
    setOpenId(null);
  };

  const handleOpenEditModal = () => {
    openModal("editWord");
    dispatch(setSelectedWord(data));
    setOpenId(null);
  };

  const togglePopUp = () => {
    setOpenId((prev) => (prev === _id ? null : _id));
  };
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setOpenId(null);
        }
      }, 2000);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className={css.wrap} ref={selectRef}>
      <BsThreeDots className={css.dotsIcon} onClick={togglePopUp} />
      {isOpen && (
        <ul className={css.popUp}>
          <li className={css.popUpItem} onClick={handleOpenEditModal}>
            <svg className={css.popUpIcon}>
              <use href="/icons/icons.svg#icon-edit" />
            </svg>
            Edit
          </li>
          <li className={css.popUpItem} onClick={() => handleDelete()}>
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
