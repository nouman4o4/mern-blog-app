import { NavLink } from "react-router";

export default function LargeMenu() {
  return (
    <div className="md:block hidden">
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
    </div>
  );
}
