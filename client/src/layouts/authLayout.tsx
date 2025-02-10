import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full relative bg-center bg-cover bg-[url(https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
      <nav className="w-full relative py-5 z-20 h-[80px]">
        <div className="logo h-full">
          <button className="text-3xl font-extrabold px-4 text-white h-full">
            <span className="p-1 bg-red-500 px-3">V</span> blog
          </button>
        </div>
      </nav>
      {/* overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-gray-700/10 via-gray-black-5 to-gray-400/10 bg-gray-900/60  backdrop-blur-xs
      "></div>
      <div className="w-full relative z-10 h-[calc(100vh-80px)]">
        <Outlet /> {/* This is where Login/Signup will be rendered */}
      </div>
    </div>
  );
};

export default AuthLayout;
