import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations.js";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isRefreshing: false,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.isError = true;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.isError = true;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(logOut.rejected, (state) => {
        state.isError = true;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isError = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
