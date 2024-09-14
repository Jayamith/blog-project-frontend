import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  error: null,
  categories: [],
  category: null,
  success: false,
};

//! Fetch Categories Action
export const fetchCategoriesAction = createAsyncThunk(
  "categories/lists",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:9080/api/v1/categories",
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Categories Slices
const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //* Fetch categories
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });

    //* Handle Fulfilled State
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //* Handle the rejection
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

//! Generate Reducer

const categoryReducer = categoriesSlice.reducer;

export default categoryReducer;
