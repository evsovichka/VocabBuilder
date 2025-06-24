import { useNavigate } from "react-router-dom";
import CategoriesList from "../CategoriesList/CategoriesList.jsx";
import SearchInput from "../SearchInput/SearchInput.jsx";
import ActionButton from "../ui/ActionButton/ActionButton.jsx";
import css from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import { selectStatistics } from "../../redux/words/selectors.js";
import { useModal } from "../../hooks/useModal.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const totalCount = useSelector(selectStatistics);
  const { openModal } = useModal();

  const handleTrainBtnClick = () => {
    navigate("/training");
  };

  return (
    <div className={css.wrap}>
      <div className={css.filterWrap}>
        <SearchInput />
        <CategoriesList
          // category={category}
          // type={type}
          // handleChangeType={handleChangeType}
          // handleChangeCategory={handleChangeCategory}
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
