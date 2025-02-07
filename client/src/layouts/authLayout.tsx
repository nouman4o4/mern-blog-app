import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Outlet /> {/* This is where Login/Signup will be rendered */}
    </div>
  );
};

export default AuthLayout;
