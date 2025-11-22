import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router"
import { About, Blog, Home, Profile } from "./pages"

import MainLayout from "./layouts/mainLayout"
import AuthLayout from "./layouts/authLayout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from "react-hot-toast"
import useUserStore from "./store/userStore"
import CreateBlog from "./pages/CreateBlog"
import Contact from "./pages/Contact"
import { useEffect } from "react"
import UpdateBlog from "./pages/UpdateBlog"
import { logout } from "./utils/logout"
import SearchPage from "./pages/SearchPage"

function App() {
  const { authUser, setAuthUser } = useUserStore()
  const navigate = useNavigate()

  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  useEffect(() => {
    ;(async () => {
      try {
        if (!authUser?._id) {
          localStorage.removeItem("blog-app-user")
          setAuthUser(null)
          return
        }
        const url = `${import.meta.env.VITE_BASE_SERVER_URL}/auth/verify/${
          authUser?._id
        }`
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        })
        if (!response.ok) {
          console.log(
            "something went wrong while verifying auth user, response: ",
            response
          )
          logout(authUser._id)
          return
        }
        const jsonResponse = await response.json()
        if (jsonResponse.success) {
          console.log("User is verified")
          return
        }
        logout(authUser._id)
        setAuthUser(null)
      } catch (error) {
        console.log(
          "Something went wrong while verifying the user, error: ",
          error
        )
        logout(authUser?._id!)
        setAuthUser(null)
      }
    })()
  }, [pathname, authUser])
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={!authUser ? <AuthLayout /> : <MainLayout />}>
          <Route
            path="/"
            element={!authUser ? <Navigate to={"/login"} /> : <Home />}
          />
          <Route
            path="/blog/:blogId"
            element={!authUser ? <Navigate to={"/login"} /> : <Blog />}
          />
          <Route
            path="/about"
            element={!authUser ? <Navigate to={"/login"} /> : <About />}
          />
          <Route
            path="/profile/:id"
            element={!authUser ? <Navigate to={"/login"} /> : <Profile />}
          />
          <Route
            path="/create-blog"
            element={!authUser ? <Navigate to={"/login"} /> : <CreateBlog />}
          />
          <Route
            path="/update-blog/:id"
            element={!authUser ? <Navigate to={"/login"} /> : <UpdateBlog />}
          />
          <Route
            path="/contact"
            element={!authUser ? <Navigate to={"/login"} /> : <Contact />}
          />
          <Route
            path="/search"
            element={!authUser ? <Navigate to={"/login"} /> : <SearchPage />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
