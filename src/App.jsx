import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar.jsx";
import MenuModal from "./components/MenuModal/MenuModal.jsx";
import { useToggle } from "./hooks/useToggle.js";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./redux/auth/selectors.js";

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

  return (
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
