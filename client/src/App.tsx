import { Navigate, Route, Routes, useLocation } from "react-router";
import { About, Blog, Home, Profile } from "./pages";

import MainLayout from "./layouts/mainLayout";
import AuthLayout from "./layouts/authLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import useUserStore from "./store/userStore";
import CreateBlog from "./pages/CreateBlog";
import Contact from "./pages/Contact";
import { useEffect } from "react";
import UpdateBlog from "./pages/UpdateBlog";

function App() {
  const authUser = useUserStore((state) => state.authUser);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
            path="/profile/:id"
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
          <Route
            path="/update-blog/:id"
            element={
              !authUser ? <Navigate to={"/login"} /> : <UpdateBlog />
            }
          />
          <Route
            path="/contact"
            element={
              !authUser ? <Navigate to={"/login"} /> : <Contact />
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
