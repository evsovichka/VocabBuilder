import { useSelector } from "react-redux";
import {
  selectStatistics,
  selectTotalCountWordsOtherUsers,
} from "../../redux/words/selectors";
import css from "./WordsPagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import clsx from "clsx";
import { useResizeWindow } from "../../hooks/resizeWindow";

export default function WordsPagination({ setPage, page, variant }) {
  const totalCountWords = useSelector(selectStatistics);
  const totalCountWordsOtherUsers = useSelector(
    selectTotalCountWordsOtherUsers
  );
  console.log(totalCountWordsOtherUsers);

  const countPages =
    variant === "dictionary"
      ? Math.ceil(totalCountWords / 7)
      : totalCountWordsOtherUsers;

  const visiblePages = [];
  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;

  if (isMobile) {
    if (countPages <= 3) {
      for (let i = 1; i <= countPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (page < countPages - 1) {
        visiblePages.push(page, page + 1, "rightDots");
      }
      if (page === countPages - 1) {
        visiblePages.push(1, "leftDots", page);
      }

      if (page === countPages) {
        visiblePages.push(1, "leftDots", page - 1, page);
      }

      if (page !== countPages) {
        visiblePages.push(countPages);
      }
    }
  } else {
    if (countPages <= 5) {
      for (let i = 1; i <= countPages; i++) {
        visiblePages.push(i);
      }
    } else {
      visiblePages.push(1);

      if (page <= 2) {
        visiblePages.push(2, 3, "rightDots");
      } else if (page === 3) {
        visiblePages.push(2, 3, 4, "rightDots");
      } else if (page === countPages - 1) {
        visiblePages.push("leftDots", countPages - 2, countPages - 1);
      } else if (page === countPages - 2) {
        visiblePages.push("leftDots", page - 1, page, page + 1);
      } else if (page === countPages) {
        visiblePages.push("leftDots", page - 2, page - 1);
      } else {
        visiblePages.push("leftDots", page - 1, page, page + 1, "rightDots");
      }
      visiblePages.push(countPages);
    }
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
        key={`item-${index}`}
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
