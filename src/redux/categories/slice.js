import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./operations.js";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default categoriesSlice.reducer;
