import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlices";
import postsReducer from "../slices/posts/postSlices";
import categoryReducer from "../slices/categories/categorySlices";
import commentsReducer from "../slices/comments/commentSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    categories: categoryReducer,
    comments: commentsReducer,
  },
});

export default store;
