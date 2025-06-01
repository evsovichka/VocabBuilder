import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar.jsx";

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
  return (
    <>
      <AppBar />
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
    </>
  );
}

export default App;
