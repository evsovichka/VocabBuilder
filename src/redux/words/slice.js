import { createSlice } from "@reduxjs/toolkit";
import { getStatistics } from "./operations.js";

const initialState = {
  items: [],
  totalCount: null,
  isLoading: false,
  isError: null,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getStatistics.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default wordsSlice.reducer;
