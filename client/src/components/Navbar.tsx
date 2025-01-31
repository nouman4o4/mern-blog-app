import { Search } from "lucide-react";

import { NavLink } from "react-router";
import useGlobalStore from "../store/globalStore";
import DesktopMenu from "./desktopMenu";
import UpperNav from "./UpperNav";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const turnOnSearch = useGlobalStore((state) => state.turnSeachOn);
  return (
    <nav>
      <div className="md:block hidden">
        <UpperNav />
        <DesktopMenu />
      </div>
      <div className="md:hidden block">
        Hello mobile menu
        <MobileMenu />
      </div>
    </nav>
  );
}
