import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice.js";
import categoriesReducer from "./categories/slice.js";
import wordsReducer from "./words/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { filtersReducer } from "./filters/slice.js";
import { selectedWordReducer } from "./SelectedWord/slice.js";

const persistedAuthReducer = persistReducer(
  {
    key: "jwt-token",
    storage,
    whitelist: ["token"],
  },
  authReducer
);

const persistedFiltersReducer = persistReducer(
  {
    key: "filters",
    storage,
  },
  filtersReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    categories: categoriesReducer,
    words: wordsReducer,
    filters: persistedFiltersReducer,
    selectedWord: selectedWordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
