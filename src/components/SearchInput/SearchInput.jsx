import { useEffect } from "react";
import css from "./SearchInput.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectKeyword } from "../../redux/filters/selectors";
import { setKeyword } from "../../redux/filters/slice";
import { fetchAllWords } from "../../redux/words/operations";
import { selectFilters } from "../../redux/filters/selectors";
// const trimmed = keyword.trim();
// if (trimmed === "") {
//   return;
// }
// const updateFilter = { ...filters, keyword: trimmed };
// console.log({ ...filters, keyword: trimmed, page });

export default function SearchInput({ value }) {
  const keyword = useSelector(selectKeyword);
  const dispatch = useDispatch();

  const filters = useSelector(selectFilters);

  const handleSearch = (e) => {
    dispatch(setKeyword(e.target.value.trim()));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchAllWords({ filters }));
      console.log("begin");
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, filters]);

  return (
    <div className={css.wrap}>
      <input
        type="text"
        placeholder="Find the word"
        className={css.input}
        onChange={handleSearch}
        value={value}
      />
      <svg width="20" height="20">
        <use href="/icons/icons.svg#icon-search" />
      </svg>
    </div>
  );
}
