import CategoriesList from "../CategoriesList/CategoriesList.jsx";
import SearchInput from "../SearchInput/SearchInput.jsx";
import css from "./Dashboard.module.css";

export default function Dashboard() {
  const totalCount = 1;
  return (
    <div className={css.wrap}>
      <SearchInput />
      <CategoriesList />
      <div className={css.statistic}>
        <p className={css.text}>To study: </p>
        <p className={css.totalCount}>{totalCount}</p>
      </div>
    </div>
  );
}
