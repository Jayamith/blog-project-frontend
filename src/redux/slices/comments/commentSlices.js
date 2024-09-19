import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";

const INITIAL_STATE = {
  loading: false,
  error: null,
  comments: [],
  comment: null,
  success: false,
};

//! Update Post Action
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:9080/api/v1/comments/${payload?.postId}`,
        {
          text: payload?.message,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Posts Slices
const commentsSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //* create comments
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    //* Handle Fulfilled State
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    });

    //* Handle the rejection
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Reset Success Action
    builder.addCase(resetSuccessAction.fulfilled, (state, action) => {
      state.error = null;
    });

    //! Reset Error Action
    builder.addCase(resetErrorAction.rejected, (state, action) => {
      state.success = false;
    });
  },
});

//! Generate Reducer

const commentsReducer = commentsSlice.reducer;

export default commentsReducer;
