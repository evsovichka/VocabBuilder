import { useNavigate, useSearchParams } from "react-router-dom";
import CategoriesList from "../CategoriesList/CategoriesList.jsx";
import SearchInput from "../SearchInput/SearchInput.jsx";
import ActionButton from "../ui/ActionButton/ActionButton.jsx";
import css from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import { selectStatistics } from "../../redux/words/selectors.js";
import { useModal } from "../../hooks/useModal.js";
import { useState } from "react";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const totalCount = useSelector(selectStatistics);
  const { openModal } = useModal();
  const [verbType, setVerbType] = useState("regular");

  const category = searchParams.get("category") || "";
  // const keyword = searchParams.get("keyword") || "";

  const updateSearchParams = (key, value) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (value === "" || value === null) {
      currentParams.delete(key);
    } else {
      currentParams.set(key, value);
    }

    setSearchParams(currentParams);
  };

  const handleSearch = (e) => {
    updateSearchParams("keyword", e.target.value.trim());
  };
  const handleChangeCategory = (value) => {
    if (value !== "verb") {
      updateSearchParams("isIrregular", "");
    } else {
      updateSearchParams(
        "isIrregular",
        verbType === "irregular" ? "true" : "false"
      );
    }
    updateSearchParams("category", value);
  };

  const handleChangeVerbType = (e) => {
    setVerbType(e.target.value);
    updateSearchParams("isIrregular", e.target.value === "irregular");
  };

  const handleTrainBtnClick = () => {
    navigate("/training");
  };
  return (
    <div className={css.wrap}>
      <div className={css.filterWrap}>
        <SearchInput onSearch={handleSearch} />
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
          <ActionButton
            svgName="icon-plus"
            className="dashboardBtn"
            onClick={() => openModal("addWord")}
          >
            Add word
          </ActionButton>
          <ActionButton
            svgName="icon-arrow-right"
            className="dashboardBtn"
            onClick={handleTrainBtnClick}
          >
            Train oneself
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
