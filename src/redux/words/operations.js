import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStatistics = createAsyncThunk(
  "words/getStatistics",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("words/statistics");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createWord = createAsyncThunk(
  "words/createWord",
  async (payload, thunkApi) => {
    try {
      const { data } = await axios.post("words/create", payload);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
