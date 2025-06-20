import { useDispatch } from "react-redux";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/categories/operations.js";

export default function DictionaryPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="container">
      <Dashboard />
    </section>
  );
}
