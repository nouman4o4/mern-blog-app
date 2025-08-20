import { SearchIcon, X } from "lucide-react";
import useGlobalStore from "../store/globalStore.ts";

import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const turnSearchOff = useGlobalStore((state) => state.turnSeachOff);
  const isSearch = useGlobalStore((state) => state.isSearch);
  const { searchedBlogs, setSearchedBlogs } = useGlobalStore();
  const navigate = useNavigate();

  const submitSearch = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery) return;
    console.log("here is search query: ", searchQuery);
    const url = `${
      import.meta.env.VITE_BASE_SERVER_URL
    }/blogs/search?searchQuery=${searchQuery.trim()}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Something went wrong when seraching", response);
      }
      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        toast("No matched data found");
      }
      setSearchedBlogs(jsonResponse.data);
      console.log({ searchedBlogs });
      turnSearchOff();

      navigate(`/search?query=${searchQuery}`);
    } catch (error) {
      console.log("Error while serching : ", error);
    }
  };

  const searchHistory = [
    "React best practices",
    "TypeScript tutorial",
    "Web development trends",
    "Node.js performance",
    "Node.js performance",
    "Node.js performance",
  ];

  return (
    <div
      className={`fixed z-50 left-0 min-w-screen bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-800/90 text-white transition-all ease h-screen duration-500 ${
        isSearch ? "top-0" : "-top-[100%]"
      }`}>
      <div className="max-w-[1400px] h-full mx-auto">
        <div className="w-full flex justify-between items-center px-6 py-8">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">
              Search <span className="text-red-500">Everything</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Discover amazing content
            </p>
          </div>
          <button
            onClick={turnSearchOff}
            className="text-white hover:text-red-500 transition-colors duration-300 group">
            <div className="flex items-center gap-3 text-lg md:text-xl">
              <span className="hidden md:inline">Close</span>
              <div className="p-2 rounded-full border border-gray-600 group-hover:border-red-500 transition-colors">
                <X className="w-6 h-6" />
              </div>
            </div>
          </button>
        </div>

        <div className="w-full text-black pt-[5em]">
          <form
            onSubmit={submitSearch}
            className="mx-auto w-[95%] md:w-[80%] my-8 p-1 md:p-3 p-r-3 bg-white text-gray-700 rounded-full flex items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 outline-0 text-xl md:text-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <button
              type="submit"
              className="size-12 bg-red-500 rounded-full text-white text-center p-2">
              <SearchIcon className="w-full h-full cursor-pointer" />
            </button>
          </form>
        </div>
        <h1 className="px-8 text-xl py-3 font-bold text-gray-200">
          History:{" "}
        </h1>
        <ul className="history mx-9 text-xl text-gray-300">
          <div className="space-y-3 h-[36vh] overflow-y-auto">
            {searchHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {item}
                </span>

                <X />
              </div>
            ))}
          </div>
          <button className="text-sm text-red-400 mt-3 cursor-pointer hover:underline">
            Clear all history
          </button>
        </ul>
      </div>
    </div>
  );
}
