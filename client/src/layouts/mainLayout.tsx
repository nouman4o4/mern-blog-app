import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import Search from "../components/Search";
import MobileMenu from "../components/MobileMenu";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="max-w-[1400px] w-full mx-auto">
      <Navbar />
      <Breadcrumbs />
      <Search />
      <MobileMenu />
      <Outlet />{" "}
      {/* This is where the page content will be rendered */}
      <Footer />
    </div>
  );
};

export default MainLayout;
