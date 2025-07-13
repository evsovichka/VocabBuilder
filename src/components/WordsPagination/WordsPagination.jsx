import { useSelector } from "react-redux";
import { selectStatistics } from "../../redux/words/selectors";
import css from "./WordsPagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import clsx from "clsx";

export default function WordsPagination({ setPage, page }) {
  const totalCountWords = useSelector(selectStatistics);
  const countPages = Math.ceil(totalCountWords / 7);
  const pagesArray = Array.from({ length: countPages });

  const handleOpenPage = (i) => {
    setPage(i);
  };

  const handleOpenNextPage = () => {
    if (page >= countPages) {
      return;
    }
    setPage(page + 1);
  };

  const handleOpenPrevPage = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleOpenFirstPage = () => {
    setPage(1);
  };

  const handleOpenLastPage = () => {
    setPage(countPages);
  };

  const listPages = pagesArray.map((_, i) => (
    <div
      key={i}
      className={clsx(css.item, page === i + 1 && css.activeItem)}
      onClick={() => {
        handleOpenPage(i + 1);
      }}
    >
      {i + 1}
    </div>
  ));

  return (
    <div className={css.list}>
      {countPages > 5 && (
        <div className={css.itemWithIcon} onClick={handleOpenFirstPage}>
          <MdOutlineKeyboardDoubleArrowLeft className={css.icon} />
        </div>
      )}
      {countPages > 1 && (
        <div className={css.itemWithIcon} onClick={handleOpenPrevPage}>
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
        <div className={css.itemWithIcon} onClick={handleOpenNextPage}>
          <IoIosArrowBack className={`${css.icon} ${css.iconReverse}`} />
        </div>
      )}
      {countPages > 5 && (
        <div className={css.itemWithIcon} onClick={handleOpenLastPage}>
          <MdOutlineKeyboardDoubleArrowLeft
            className={`${css.icon} ${css.iconReverse}`}
          />
        </div>
      )}
    </div>
  );
}
