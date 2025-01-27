import { Search } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <div>
      <div className="w-full flex justify-between items-center bg-gray-100 h-[100px]">
        <div className="logo h-full">
          <button className="text-3xl font-extrabold px-4 text-black h-full ">
            V.blog
          </button>
        </div>
        <div className="nav flex flex-center gap-16 text-gray-500 font-semibold">
          <NavLink className="link-hover" to="/">
            Home
          </NavLink>
          <NavLink className="link-hover" to="/">
            About
          </NavLink>
          <NavLink className="link-hover" to="/">
            Contact
          </NavLink>
          <NavLink className="link-hover" to="/">
            Settings
          </NavLink>
          <NavLink className="link-hover" to="/">
            Author
          </NavLink>
        </div>

        <button className="nav-right bg-red-400 text-white h-full w-[100px] text-center">
          <NavLink
            to="/"
            style={{ textAlign: "-webkit-center" }}
            className="text-center  w-full h-full">
            <Search />
          </NavLink>
        </button>
      </div>
    </div>
  );
}
