import "./App.css";
import { Route, Routes } from "react-router";
import { Blog, About, Home, UserSetting } from "./pages";

function App() {
  return (
    <>
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
