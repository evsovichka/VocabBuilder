import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar.jsx";
import MenuModal from "./components/MenuModal/MenuModal.jsx";
import { useToggle } from "./hooks/useToggle.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "./redux/auth/selectors.js";
import { refreshUser } from "./redux/auth/operations.js";

const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage.jsx")
);

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const DictionaryPage = lazy(() =>
  import("./pages/DictionaryPage/DictionaryPage.jsx")
);
const RecommendPage = lazy(() =>
  import("./pages/RecommendPage/RecommendPage.jsx")
);

const TrainingPage = lazy(() =>
  import("./pages/TrainingPage/TrainingPage.jsx")
);

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const { isOpen, toggle } = useToggle();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Please wait for refreshing user...</p>
  ) : (
    <>
      <AppBar onOpen={toggle} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/dictionary" element={<DictionaryPage />}></Route>
          <Route path="/recommend" element={<RecommendPage />}></Route>
          <Route path="/training" element={<TrainingPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
      {isLoggedIn && <MenuModal onClose={toggle} isOpen={isOpen} />}
    </>
  );
}

export default App;
