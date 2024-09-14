import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlices";
import postsReducer from "../slices/posts/postSlices";
import categoryReducer from "../slices/categories/categorySlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    categories: categoryReducer,
  },
});

export default store;
