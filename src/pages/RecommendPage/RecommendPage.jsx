import clsx from "clsx";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWordsOtherUsers } from "../../redux/words/operations";
import { selectWordsOtherUsers } from "../../redux/words/selectors";
import WordTable from "../../components/WordTable/WordTable";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import { selectFilters } from "../../redux/filters/selectors";
import css from "./RecommendPage.module.css";

export default function RecommendPage() {
  const dispatch = useDispatch();
  const words = useSelector(selectWordsOtherUsers);
  const filters = useSelector(selectFilters);
  const [page, setPage] = useState(1);
  console.log(words);

  useEffect(() => {
    dispatch(fetchWordsOtherUsers({ page, filters }));
  }, [dispatch, page, filters]);

  return (
    <section className={clsx("container", css.wrap)}>
      <Dashboard />
      <WordTable wordsList={words} variant="recommend" />
      <WordsPagination setPage={setPage} page={page} />
    </section>
  );
}
