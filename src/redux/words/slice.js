import { createSlice } from "@reduxjs/toolkit";
import { createWord, fetchAllWords, getStatistics } from "./operations.js";

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
      })
      .addCase(createWord.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createWord.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchAllWords.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
      })
      .addCase(fetchAllWords.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default wordsSlice.reducer;
