import { Route, Routes } from "react-router";
import { Blog, About, Home, UserSetting } from "./pages";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";
import Search from "./components/Search";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer";
import MainLayout from "./layouts/mainLayout";
import AuthLayout from "./layouts/authLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:blogId" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/setting" element={<UserSetting />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
