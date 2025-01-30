import { BatteryCharging, ChevronDown, Cloud } from "lucide-react";

export default function UpperNav() {
  return (
    <div>
      <div className="w-full flex justify-between ">
        <div className="left grid grid-cols-2 w-[20%] grid-rows-[50px]">
          <div className="bg-red-400 text-white textCenter flex items-center justify-around">
            English <ChevronDown />
          </div>
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
