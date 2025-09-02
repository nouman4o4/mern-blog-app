import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="w-full pt-5 bg-black text-white">
      <h1 className="text-center text-2xl font-semibold mb-3">
        Let's get started on something great
      </h1>
      <div className="buttons text-center py-3">
        <button className="border-2 border-white py-2 px-3 rounded-lg hover:bg-white/10 mx-3">
          Chat to us
        </button>
        <button className="border-2 border-white py-2 px-3 rounded-lg hover:bg-white/10 mx-3">
          Get started
        </button>
      </div>
      <div className="links w-full mx-auto flex justify-center gap-7 lg:gap-13 my-3 p-2 bg-gray-200/0">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact Us</Link>
      </div>
      <div className="w-full ">
        <p className="text-center py-2 text-sm text-gray-300 bordert bg-gray-800 border-t-gray-400/40">
          <span>Developed by Nouman Khan</span> 2025 &copy; All rights
          reserved
        </p>
      </div>
    </div>
  );
}
