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

export default function DictionaryPage() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getStatistics());
    dispatch(fetchAllWords({ filters, page }));
  }, [dispatch, page, filters]);

  return (
    <section className={clsx("container", css.wrap)}>
      <Dashboard />
      <WordTable />
      <WordsPagination setPage={setPage} page={page} />
    </section>
  );
}
