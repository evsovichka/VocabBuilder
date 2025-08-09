import { useNavigate } from "react-router-dom";
import CategoriesList from "../CategoriesList/CategoriesList.jsx";
import SearchInput from "../SearchInput/SearchInput.jsx";
import ActionButton from "../ui/ActionButton/ActionButton.jsx";
import css from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectStatistics } from "../../redux/words/selectors.js";
import { useModal } from "../../hooks/useModal.js";
import { useState } from "react";
import { setCategory, setIsIrregular } from "../../redux/filters/slice.js";
import {
  selectCategory,
  selectKeyword,
} from "../../redux/filters/selectors.js";
// import { fetchAllWords } from "../../redux/words/operations.js";

export default function Dashboard({ variant }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal } = useModal();

  const [verbType, setVerbType] = useState("regular");

  const totalCount = useSelector(selectStatistics);

  const category = useSelector(selectCategory);
  const keyword = useSelector(selectKeyword);
  // const filters = useSelector(selectFilters);
  // const isIrregular = useSelector(selectIsIrregular);

  // const handleSearch = (e) => {
  //   dispatch(setKeyword(e.target.value.trim()));

  //   setTimeout(() => {
  //     dispatch(fetchAllWords(filters));
  //     console.log("time");
  //   }, 300);
  // };

  const handleChangeCategory = (value) => {
    dispatch(setCategory(value));

    if (value !== "verb") {
      dispatch(setIsIrregular(null));
      setVerbType("regular");
    } else {
      dispatch(setIsIrregular(verbType === "irregular"));
    }
  };

  const handleChangeVerbType = (e) => {
    const value = e.target.value;
    setVerbType(value);
    dispatch(setIsIrregular(value === "irregular"));
  };

  return (
    <div className={css.wrap}>
      <div className={css.filterWrap}>
        <SearchInput value={keyword} />
        <CategoriesList
          category={category}
          type={verbType}
          handleChangeVerbType={handleChangeVerbType}
          handleChangeCategory={handleChangeCategory}
          variant="dashboard"
        />
      </div>
      <div className={css.bottomWrap}>
        <div className={css.statistic}>
          <p className={css.text}>To study: </p>
          <p className={css.totalCount}>{totalCount}</p>
        </div>
        <div className={css.buttonBox}>
          {variant === "dictionary" && (
            <ActionButton
              svgName="icon-plus"
              className="dashboardBtn"
              onClick={() => openModal("addWord")}
            >
              Add word
            </ActionButton>
          )}
          <ActionButton
            svgName="icon-arrow-right"
            className="dashboardBtn"
            onClick={() => {
              navigate("/training");
            }}
          >
            Train oneself
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
