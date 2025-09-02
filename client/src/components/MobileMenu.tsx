import { Search, X } from "lucide-react";
import useGlobalStore from "../store/globalStore.ts";
import { cn } from "../utils/clsx";
import { Link, NavLink } from "react-router";
import useUserStore from "../store/userStore.ts";
import { useEffect, useRef } from "react";

export default function MobileMenu() {
  const { isMobileMenu, turnMobileMenuOff, turnSeachOn } =
    useGlobalStore((state) => state);
  const { authUser: authUserInStore } = useUserStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const authUser =
    JSON.parse(localStorage.getItem("blog-app-user")!) ||
    authUserInStore;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        turnMobileMenuOff();
      }
    }

    isMobileMenu &&
      document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenu]);

  return (
    <>
      <div
        className={`md:hidden absolute inset-0 z-40 h-screen bg-black/40 overflow-hidden transition-all duration-50 ${
          isMobileMenu ? "block" : "invisible"
        } `}></div>
      <div>
        <div
          className={`md:hidden absolute inset-0 h-screen overflow-hidden transition-all flex ${
            isMobileMenu ? "block" : "invisible"
          } `}>
          <div
            onClick={turnMobileMenuOff}
            className="empty grow-1 z-20"></div>
          {/* devide */}
          <div
            ref={menuRef}
            className={`relative z-50 duration-600 ease ${cn(
              isMobileMenu ? "translate-x-[0]" : "translate-x-[100%]"
            )} menu grow-1 sm:grow-2 sm:max-w-[350px] bg-white py-3 px-2`}>
            <nav className="w-full flex justify-between px-6 mb-5 border-b border-gray-100 pb-2">
              <button
                onClick={() => {
                  turnMobileMenuOff();
                  turnSeachOn();
                }}
                className="ease duration-200 hover:bg-red-500 hover:text-white p-2 rounded-full">
                <Search className="" />
              </button>
              <button
                onClick={turnMobileMenuOff}
                className="ease duration-200 hover:bg-red-500 hover:text-white p-2 rounded-full">
                <X />
              </button>
            </nav>
            {/* Loged in user */}
            {authUser ? (
              <div className="border-b-1 border-gray-300">
                <div className="h-full p-2 flex items-center gap-4">
                  <div>
                    <NavLink
                      to={`/profile/${authUser._id}`}
                      onClick={turnMobileMenuOff}>
                      <img
                        src={`${
                          authUser?.profileImage?.secureUrl
                            ? authUser?.profileImage.secureUrl
                            : authUser?.gender === "male"
                            ? "https://avatar.iran.liara.run/public/41"
                            : "https://avatar.iran.liara.run/public/88"
                        }`}
                        className="size-14 bg-white rounded-full border-3 border-white"
                      />
                    </NavLink>
                  </div>
                  <NavLink
                    to={`/profile/${authUser._id}`}
                    onClick={turnMobileMenuOff}
                    className={"text-left"}>
                    <p className="Firstname font-semibold ">
                      {authUser.email}
                    </p>
                    <p className="Firstname fontsemibold text-sm">
                      {authUser.firstname} {authUser.lastname}
                    </p>
                  </NavLink>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="links w-full py-3">
              <ul className="flex flex-col gap-4 text-lg text-gray-700">
                <NavLink
                  onClick={turnMobileMenuOff}
                  to={"/"}
                  className="mblMenuLink">
                  Home
                </NavLink>
                <NavLink
                  onClick={turnMobileMenuOff}
                  to={"/about"}
                  className="mblMenuLink">
                  About
                </NavLink>

                <NavLink
                  onClick={turnMobileMenuOff}
                  to={"/contact"}
                  className="mblMenuLink">
                  Contact
                </NavLink>
              </ul>
            </div>
            <div className="logo w-full p-4 my-4 text-center">
              <Link
                onClick={turnMobileMenuOff}
                to={"/"}
                className="text-3xl font-extrabold px-4 text-black h-full">
                <span className="p-1 bg-red-500 text-white px-3">
                  V
                </span>{" "}
                blog
              </Link>
            </div>
            <div className="footer w-full absolute left-0 bottom-0 bg-gray-100 p-3 text-center">
              www.vblog.com All right reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
