import { SearchIcon, X } from "lucide-react";
import useGlobalStore from "../store/globalStore";
import { Link } from "react-router";

export default function Search() {
  const turnSearchOff = useGlobalStore((state) => state.turnSeachOff);
  const isSearch = useGlobalStore((state) => state.isSearch);
  return (
    <div
      className={`absolute left-0 w-screen bg-black/90 text-white transition-all ease h-screen duration-500 ${
        isSearch ? "bottom-0" : "bottom-[100%]"
      }`}>
      <div className="max-w-[1400px] h-full mx-auto">
        <div className="w-full flex justify-between items-center px-8 py-[4em]">
          <div className="logo">
            <h1 className="text-4xl md:text-6xl font-bold">
              {" "}
              V.Blog
            </h1>
          </div>
          <div className="text-xl md:text-3xl  ">
            <button
              onClick={turnSearchOff}
              className="cursor-pointer">
              Close <X className="inline size-8" />
            </button>
          </div>
        </div>

        <div className="w-full text-black pt-[5em]">
          <form className="mx-auto w-[95%] md:w-[80%] my-8 p-1 md:p-3 bg-white text-gray-700 rounded-full flex items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 outline-0 text-xl md:text-2xl "
            />
            <Link to={"/search-result"}>
              <SearchIcon className="w-7 md:w-10 h-full mr-3 cursor-pointer" />
            </Link>
          </form>
        </div>
        <h1 className="px-8 text-xl py-3 font-bold text-gray-200">
          History:{" "}
        </h1>
        <ul className="history mx-9 text-xl text-gray-300">
          <li className="hover:underline cursor-pointer">
            lorem ipsom dollor
          </li>
          <li className="hover:underline cursor-pointer">
            lorem ipsom dollor
          </li>
          <li className="hover:underline cursor-pointer">
            lorem ipsom dollor
          </li>
        </ul>
      </div>
    </div>
  );
}
