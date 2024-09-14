import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import Login from "./components/User/Login";
import UserProfile from "./components/User/UserProfile";
import PublicNavBar from "./components/NavBar/PublicNavBar";
import { useSelector } from "react-redux";
import PrivateNavBar from "./components/NavBar/PrivateNavBar";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import PublicPosts from "./components/Post/PublicPosts";
import AddPost from "./components/Post/AddPost";
import PostDetails from "./components/Post/PostDetails";
import PostList from "./components/Post/PostList";
import UpdatePost from "./components/Post/UpdatePost";

export default function App() {
  const { userAuth } = useSelector((state) => state?.users);
  const isLoggedIn = userAuth?.userInfo?.token;

  return (
    <BrowserRouter>
      {isLoggedIn ? <PrivateNavBar /> : <PublicNavBar />}
      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/public-posts" element={<PublicPosts />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/add-post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/posts/update/:postId"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
