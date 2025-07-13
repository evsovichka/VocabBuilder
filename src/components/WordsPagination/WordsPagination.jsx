import { useSelector } from "react-redux";
import { selectStatistics } from "../../redux/words/selectors";
import css from "./WordsPagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

export default function WordsPagination() {
  const totalCountWords = useSelector(selectStatistics);
  const countPages = Math.ceil(totalCountWords / 7);
  const arrayPages = Array.from({ length: countPages });
  const listPages = arrayPages.map((_, i) => (
    <div key={i} className={css.item}>
      {i + 1}
    </div>
  ));

  return (
    <div className={css.list}>
      {countPages > 5 && (
        <div className={css.itemWithIcon}>
          <MdOutlineKeyboardDoubleArrowLeft className={css.icon} />
        </div>
      )}
      {countPages > 1 && (
        <div className={css.itemWithIcon}>
          <IoIosArrowBack className={css.icon} />
        </div>
      )}
      {countPages < 5 ? (
        listPages
      ) : (
        <>
          {listPages.slice(0, 3)}
          <div className={`${css.item} ${css.itemThreeDots}`}>
            <BsThreeDots className={css.iconThreedots} />
          </div>
          {listPages.slice(-1)}
        </>
      )}

      {countPages > 1 && (
        <div className={css.itemWithIcon}>
          <IoIosArrowBack className={`${css.icon} ${css.iconReverse}`} />
        </div>
      )}
      {countPages > 5 && (
        <div className={css.itemWithIcon}>
          <MdOutlineKeyboardDoubleArrowLeft
            className={`${css.icon} ${css.iconReverse}`}
          />
        </div>
      )}
    </div>
  );
}
