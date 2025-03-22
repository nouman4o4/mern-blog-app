import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router";

export default function Breadcrumbs() {
  const location = useLocation();
  console.log(location.pathname.split("/").filter((e) => e));
  return (
    <div className="w-full flex items-center font-bold text-gray-500 bg-gray-200 text-sm px-2">
      <li className="flex items-center p-1 bg-gry-500">Home</li>
      <ChevronRight className="size-4 ml-1 text-black" />
      <li className="flex items-center p-1 bg-gra-500">Blog</li>
    </div>
  );
}
