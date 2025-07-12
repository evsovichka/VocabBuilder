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

export const fetchAllWords = createAsyncThunk(
  "words/fetchAll",
  async ({ filters, page = 1 }, thunkApi) => {
    const { category, keyword, isIrregular } = filters;

    const params = {
      limit: 7,
      page,
      ...(category && { category }),
      ...(keyword && { keyword }),
      ...(typeof isIrregular === "boolean" && { isIrregular }),
    };
    try {
      const { data } = await axios.get("words/own", { params });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  "words/delete",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`words/delete/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editWord = createAsyncThunk(
  "words/edit",
  async (payload, thunkApi) => {
    try {
      const { id, ...updatedData } = payload;
      const { data } = await axios.patch(`words/edit/${id}`, {
        ...updatedData,
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
