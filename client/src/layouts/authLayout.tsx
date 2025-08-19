import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full relative min-h-screen">
      {/* Navbar */}
      <nav className="w-full relative py-5 z-20 h-[80px] bg-black">
        <div className="logo h-full">
          <button className="text-3xl font-extrabold px-4 text-white h-full">
            <span className="p-1 bg-red-500 px-3">V</span> blog
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-gray-700/10 via-gray-black-5 to-gray-400/10 bg-gray-900/60 backdrop-blur-xs"></div>

      {/* Content */}
      <div className="w-full relative z-10 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
