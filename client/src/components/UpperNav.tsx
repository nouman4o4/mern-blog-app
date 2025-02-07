import { BatteryCharging, ChevronDown, Cloud } from "lucide-react";
import { useState } from "react";
import { useEffect, useRef } from "react";
export default function UpperNav() {
  const [lang, setLang] = useState<string>("Englsh");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const languages = ["English", "Urdu", "Spanish", "Persian"];

  const dropdonwRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdonwRef.current &&
        !dropdonwRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };
    document.body.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="md:block hidden relative">
      <div className="w-full flex justify-between ">
        <div className="left grid grid-cols-2 w-[20%] grid-rows-[50px]">
          <div className="bg-white text-red-500 textCenter border-r-1 border-r-gray-300 flex items-center justify-around">
            {lang}{" "}
            <span
              onClick={() => setShowDropDown(!showDropDown)}
              className="cursor-pointer p-1">
              {" "}
              <ChevronDown
                className={`duration-200 ${
                  showDropDown && " rotate-180"
                } `}
              />{" "}
            </span>
          </div>
          {showDropDown ? (
            <div
              ref={dropdonwRef}
              className="dropDown-menu absolute top-15 left-10 bg-white w-32 rounded-lg px-1 ">
              <ul className="h-full ">
                {languages.map((item, i) => (
                  <li
                    key={item}
                    onClick={() => setLang(item)}
                    className={`${
                      i === languages.length - 1 ? "" : "border-b-1"
                    } border-b-gray-200 hover:bg-gray-50 cursor-pointer p-2`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
          <div className="textCenter flexCenter gap-3 border-r-1 border-r-gray-300">
            <Cloud className="text-red-400" /> 17
          </div>
        </div>
        <div className="rihgt  gap-3 flexCenter">
          <BatteryCharging className="textCenter" />{" "}
          <p className="text-gray-500 text-nowrap pr-3 overflow-x-clip">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ea, fuga?
          </p>
        </div>
      </div>
    </div>
  );
}
