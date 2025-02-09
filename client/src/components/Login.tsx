const Login = () => {
  return (
    <div className="w-full z-10 max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
