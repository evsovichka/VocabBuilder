import { useEffect } from "react";
import css from "./SearchInput.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectKeyword } from "../../redux/filters/selectors";
import { setKeyword } from "../../redux/filters/slice";
import { fetchAllWords } from "../../redux/words/operations";
import { selectFilters } from "../../redux/filters/selectors";

export default function SearchInput({ value }) {
  const keyword = useSelector(selectKeyword);
  const dispatch = useDispatch();

  const filters = useSelector(selectFilters);

  const page = 1;

  const handleSearch = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  useEffect(() => {
    const trimmed = keyword.trim();
    if (trimmed === "") {
      return;
    }
    console.log({ ...filters, keyword: trimmed, page });
    const timer = setTimeout(() => {
      dispatch(fetchAllWords({ ...filters, keyword: trimmed, page }));
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
