import { Navigate, Route, Routes } from "react-router";
import { About, Blog, Home, Profile } from "./pages";

import MainLayout from "./layouts/mainLayout";
import AuthLayout from "./layouts/authLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import useUserStore from "./store/userStore";
import CreateBlog from "./pages/CreateBlog";

function App() {
  const authUser =
    JSON.parse(localStorage.getItem("blog-app-user")!) ||
    useUserStore((state) => state.authUser);
  console.log(authUser);
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              !authUser ? <Navigate to={"/login"} /> : <Home />
            }
          />
          <Route
            path="/blog/:blogId"
            element={
              !authUser ? <Navigate to={"/login"} /> : <Blog />
            }
          />
          <Route
            path="/about"
            element={
              !authUser ? <Navigate to={"/login"} /> : <About />
            }
          />
          <Route
            path="/profile"
            element={
              !authUser ? <Navigate to={"/login"} /> : <Profile />
            }
          />
          <Route
            path="/create-blog"
            element={
              !authUser ? <Navigate to={"/login"} /> : <CreateBlog />
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
