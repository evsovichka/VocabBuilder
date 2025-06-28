import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  category: "",
  isIrregular: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setIsIrregular(state, action) {
      state.isIrregular = action.payload;
    },
    resetFilters(state) {
      return initialState;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;

export const { setCategory, setKeyword, setIsIrregular, resetFilters } =
  filtersSlice.actions;
