import { Menu, Search } from "lucide-react";

import useGlobalStore from "../store/globalStore.ts";
import LargeMenu from "./LargeMenu";
import UpperNav from "./UpperNav";

export default function Navbar() {
  const { turnSeachOn, turnMobileMenuOn, isMobileMenu, isSearch } =
    useGlobalStore((state) => state);
  if (isMobileMenu || isSearch) {
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
  } else if (!isMobileMenu || !isSearch) {
    document.body.style.height = "auto";
    document.body.style.overflowY = "auto";
  }

  return (
    <div>
      <UpperNav />
      <div className="flex flex-wrap w-full  justify-between items-center bg-black h-[100px]">
        <div className="logo h-full">
          <button className="text-3xl font-extrabold px-4 text-white h-full">
            <span className="p-1 bg-red-500 px-3">V</span> blog
          </button>
        </div>
        <LargeMenu />

        <div className="nav-righ h-full flex ">
          <button
            className="sm:inline hidden bg-red-500 text-white h-full w-[100px] cursor-pointer"
            onClick={turnSeachOn}>
            <Search className="inline" />
          </button>
          <button
            onClick={turnMobileMenuOn}
            className="md:hidden inline ml-1 bg-red-500 text-white h-full w-[100px] cursor-pointer">
            <Menu className="inline size-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
