import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar.jsx";
import MenuModal from "./components/MenuModal/MenuModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "./redux/auth/selectors.js";
import { refreshUser } from "./redux/auth/operations.js";
import RestrictedRoute from "./components/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

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
      <AppBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegisterPage />}
                redirectTo={"/dictionary"}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo={"/dictionary"}
              />
            }
          ></Route>
          <Route
            path="/dictionary"
            element={
              <PrivateRoute
                component={<DictionaryPage />}
                redirectTo={"/login"}
              />
            }
          ></Route>
          <Route
            path="/recommend"
            element={
              <PrivateRoute
                component={<RecommendPage />}
                redirectTo={"/login"}
              />
            }
          ></Route>
          <Route
            path="/training"
            element={
              <PrivateRoute
                component={<TrainingPage />}
                redirectTo={"/login"}
              />
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
      {isLoggedIn && <MenuModal />}
    </>
  );
}

export default App;
