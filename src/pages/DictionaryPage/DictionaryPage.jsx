import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/categories/operations.js";
import { fetchAllWords, getStatistics } from "../../redux/words/operations.js";
import { selectFilters } from "../../redux/filters/selectors.js";
import WordTable from "../../components/WordTable/WordTable.tsx";
import css from "./DictionaryPage.module.css";
import clsx from "clsx";
import WordsPagination from "../../components/WordsPagination/WordsPagination.jsx";
import { selectAllWords } from "../../redux/words/selectors.js";

export default function DictionaryPage() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [page, setPage] = useState(1);
  const wordsList = useSelector(selectAllWords);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getStatistics());
    dispatch(fetchAllWords({ filters, page }));
  }, [dispatch, page, filters]);

  return (
    <section className={clsx("container", css.wrap)}>
      <Dashboard variant="dictionary" />
      <WordTable wordsList={wordsList} variant="dictionary" />
      <WordsPagination setPage={setPage} page={page} variant="dictionary" />
    </section>
  );
}
