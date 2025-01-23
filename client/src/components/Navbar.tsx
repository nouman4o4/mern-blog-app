import React from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <div>
      <div className="w-full flex justify-center bg-black text-white">
        <div className="logo">
          <h1 className="text-3xl font-bold">Logo</h1>
        </div>
        <ul className="nav flex flex-center ">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Home</NavLink>
        </ul>
      </div>
    </div>
  );
}
