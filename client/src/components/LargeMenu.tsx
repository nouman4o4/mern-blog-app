import { NavLink } from "react-router";

export default function LargeMenu() {
  return (
    <div className="md:block hidden">
      <div className="nav flex flex-center gap-16 text-gray-50 font-semibold">
        <NavLink className="largeMenulink" to="/">
          Home
        </NavLink>
        <NavLink className="largeMenulink" to="/">
          About
        </NavLink>
        <NavLink className="largeMenulink" to="/">
          Contact
        </NavLink>
      </div>
    </div>
  );
}
