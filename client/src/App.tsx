import { Route, Routes } from "react-router";
import { Blog, About, Home, UserSetting } from "./pages";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";
import Search from "./components/Search";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <Search />
      <MobileMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/useSetting" element={<UserSetting />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
