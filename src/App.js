import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import Login from "./components/User/Login";
import UserProfile from "./components/User/UserProfile";
import PublicNavBar from "./components/NavBar/PublicNavBar";
import { useSelector } from "react-redux";
import PrivateNavBar from "./components/NavBar/PrivateNavBar";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";

export default function App() {
  const { userAuth } = useSelector((state) => state?.users);
  const isLoggedIn = userAuth?.userInfo?.token;

  return (
    <BrowserRouter>
      {isLoggedIn ? <PrivateNavBar /> : <PublicNavBar />}
      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
