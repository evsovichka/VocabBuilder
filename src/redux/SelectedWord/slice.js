import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  en: "",
  ua: "",
  category: "",
  isIrregular: null,
};

const selectedWordSlice = createSlice({
  name: "selectedWord",
  initialState,
  reducers: {
    setSelectedWord(state, action) {
      state.id = action.payload._id;
      state.en = action.payload.en;
      state.ua = action.payload.ua;
      state.category = action.payload.category;
      state.isIrregular = action.payload.isIrregular;
    },
    resetSelectedWord(state) {
      return initialState;
    },
  },
});

export const selectedWordReducer = selectedWordSlice.reducer;
export const { setSelectedWord, resetSelectedWord } = selectedWordSlice.actions;
