import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  success: false,
};

//! Fetch Public Posts Action
export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:9080/api/v1/posts/public",
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Fetch Private Posts Action
export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {

      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:9080/api/v1/posts",
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Get Single Post Action
export const fetchSinglePostAction = createAsyncThunk(
  "posts/get-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:9080/api/v1/posts/${postId}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Delete Single Post Action
export const deleteSinglePostAction = createAsyncThunk(
  "posts/delete-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:9080/api/v1/posts/${postId}`, config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Create Post Action
export const createPostAction = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formdata = new FormData();
      formdata.append("title", payload?.title);
      formdata.append("content", payload?.content);
      formdata.append("categoryId", payload?.category);
      formdata.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:9080/api/v1/posts",
        formdata,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Update Post Action
export const updatePostAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formdata = new FormData();
      formdata.append("title", payload?.title);
      formdata.append("content", payload?.content);
      formdata.append("categoryId", payload?.category);
      formdata.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:9080/api/v1/posts/${payload?.postId}`,
        formdata,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Posts Slices
const publicPostSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //* Fetch public posts
    builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
      state.loading = true;
    });

    //* Handle Fulfilled State
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });

    //* Handle the rejection
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Create post
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });

    //* Handle Fulfilled State
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //* Handle the rejection
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });

    //* Handle Fulfilled State
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //* Handle the rejection
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Delete post
    builder.addCase(deleteSinglePostAction.pending, (state, action) => {
      state.loading = true;
    });

    //* Handle Fulfilled State
    builder.addCase(deleteSinglePostAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //* Handle the rejection
    builder.addCase(deleteSinglePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Get Single post
    builder.addCase(fetchSinglePostAction.pending, (state, action) => {
      state.loading = true;
    });

    //* Handle Fulfilled State
    builder.addCase(fetchSinglePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    //* Handle the rejection
    builder.addCase(fetchSinglePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //* Fetch private posts
    builder.addCase(fetchPrivatePostsAction.pending, (state, action) => {
      state.loading = true;
    });

    //* Handle Fulfilled State
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //* Handle the rejection
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

//! Generate Reducer

const postsReducer = publicPostSlice.reducer;

export default postsReducer;
