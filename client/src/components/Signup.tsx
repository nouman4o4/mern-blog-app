import { Contact, Eye, Mail } from "lucide-react";
import { NavLink } from "react-router";

export default function Signup() {
  return (
    <div className="absolute top-0 left-0 w-full flex itemscenter justify-start text-white">
      <div className="container w-full md:w-[700px] px-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold my-3">
          Create new account
          <span className="text-red-500">.</span>
        </h1>{" "}
        <div className="text-gray-300 my-2">
          Already a member?{" "}
          <NavLink to={"/login"} className="text-red-400 underline">
            Login
          </NavLink>
        </div>
        {/* Form */}
        <div>
          <form className="w-full b-gray-700 mt-6 flex flex-col justify-center gap-1 md:gap-3">
            {/* nameInputs */}
            <div className="name-inputs w-full flex gap-4 flex-wrap">
              <div className="input px-3 md:px-4 pr-4 p-1 md:p-2 bg-gray-600 rounded-xl grow flex items-center justify-between">
                <div>
                  <label
                    htmlFor="firstname"
                    className="text-[12px] text-lg font-semibold block text-gray-300 my-1">
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Jhon"
                    className=" md:text-lg text-white p-1 font-bold ring-0 outline-none"
                  />
                </div>
                <div>
                  <Contact />
                </div>
              </div>
              <div className="input px-3 md:px-4 pr-4 p-1 md:p-2 bg-gray-600 rounded-xl grow flex items-center justify-between">
                <div>
                  <label
                    htmlFor="lastname"
                    className="text-[12px] font-semibold block text-gray-300 my-1">
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Doe"
                    className=" md:text-lg text-white p-1 font-semibold ring-0 outline-none"
                  />
                </div>
                <div>
                  <Contact />
                </div>
              </div>
            </div>
            {/* email */}
            <div className="name-inputs w-full flex gap-4 mt-3">
              <div className="input px-3 md:px-4 p-1 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3">
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
                    className="w-full  md:text-lg text-white p-1 font-semibold ring-0 outline-none"
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
                    className="w-full  md:text-lg text-white p-1 font-semibold ring-0 outline-none"
                  />
                </div>
                <div>
                  <Eye />
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
                    Confirmt Password
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="•••••••"
                    className="w-full  md:text-lg text-white p-1 font-semibold ring-0 outline-none"
                  />
                </div>
                <div>
                  <Eye />
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
}
