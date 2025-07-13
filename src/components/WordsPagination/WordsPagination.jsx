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
  const visiblePages = [];

  if (countPages <= 5) {
    for (let i = 1; i <= countPages; i++) {
      visiblePages.push(i);
    }
  } else {
    visiblePages.push(1);

    if (page <= 2) {
      visiblePages.push(2);
      visiblePages.push(3);
      visiblePages.push("rightDots");
    } else if (page >= countPages - 1) {
      visiblePages.push("leftDots");
      visiblePages.push(countPages - 2);
      visiblePages.push(countPages - 1);
    } else {
      visiblePages.push("leftDots");
      visiblePages.push(page - 1);
      visiblePages.push(page);
      visiblePages.push(page + 1);
      visiblePages.push("rightDots");
    }
    visiblePages.push(countPages);
  }

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

  const listPages = visiblePages.map((item, index) => {
    if (item === "leftDots" || item === "rightDots") {
      return (
        <div
          key={`dots-${index}`}
          className={`${css.item} ${css.itemThreeDots}`}
        >
          <BsThreeDots className={css.iconThreedots} />
        </div>
      );
    }

    return (
      <div
        key={item}
        className={clsx(css.item, page === item && css.activeItem)}
        onClick={() => handleOpenPage(item)}
      >
        {item}
      </div>
    );
  });
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

      {listPages}

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
