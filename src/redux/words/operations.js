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
