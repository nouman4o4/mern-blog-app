import { Contact, Eye, EyeOff, Mail } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="absolute top-0 left-0 w-full flex itemscenter justify-start text-white">
      <div className="container w-full md:w-[700px] px-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold my-3">
          Login to your account
          <span className="text-red-500">.</span>
        </h1>{" "}
        <div className="text-gray-300 my-2">
          Don't have an account{" "}
          <NavLink to={"/signup"} className="text-red-400 underline">
            signup
          </NavLink>
        </div>
        {/* Form */}
        <div>
          <form className="w-full b-gray-700 mt-6 flex flex-col justify-center gap-1 md:gap-3">
            {/* email */}
            <div className="name-inputs w-full flex gap-4 mt-3">
              <div className="input p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3">
                <div className="grow ">
                  <label
                    htmlFor="email"
                    className="text-[12px] font-semibold block text-gray-300 my-1">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="user@example.com"
                    className="w-full tracking-wider md:text-lg text-white p-1 font-semibold ring-0 outline-none"
                  />
                </div>
                <div>
                  <Mail />
                </div>
              </div>
            </div>

            {/* password */}
            <div className="name-inputs w-full flex gap-4 mt-3">
              <div className="input px-3 md:px-4 p-1 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3">
                <div className="grow ">
                  <label
                    htmlFor="email"
                    className="text-[12px] font-semibold block text-gray-300 my-1">
                    Password
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="•••••••"
                    className="w-full tracking-wider md:text-lg text-white p-1 font-semibold ring-0 outline-none"
                  />
                </div>
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer">
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-500 rounded-3xl py-2 md:py-3 text-lg md:text-xl font-semibold mt-3">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
