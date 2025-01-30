import { Route, Routes } from "react-router";
import { Blog, About, Home, UserSetting } from "./pages";
import Navbar from "./components/Navbar";
import UpperNav from "./components/UpperNav";
import Breadcrumbs from "./components/Breadcrumbs";
import Search from "./components/Search";

function App() {
  return (
    <>
      <UpperNav />
      <Navbar />
      <Breadcrumbs />
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/useSetting" element={<UserSetting />} />
      </Routes>
    </>
  );
}

export default App;
