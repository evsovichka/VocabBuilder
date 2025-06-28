import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/categories/operations.js";
import { fetchAllWords, getStatistics } from "../../redux/words/operations.js";
import { selectFilters } from "../../redux/filters/selectors.js";

export default function DictionaryPage() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const page = 1;
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getStatistics());
    dispatch(fetchAllWords({ filters, page }));
  }, [dispatch]);

  return (
    <section className="container">
      <Dashboard />
    </section>
  );
}
