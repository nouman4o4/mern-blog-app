import { Eye, EyeOff, Mail } from "lucide-react";
import { useActionState, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { loginSchema } from "../schemas/loginSchema";
import toast from "react-hot-toast";
import useUserStore from "../store/userStore";

type FormState = {
  email: string;
  password: string;
  error?: string;
};
interface FieldErrorsI {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrorsI>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setAuthUser } = useUserStore();

  const clearFieldError = (field: keyof FieldErrorsI) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const submitForm = async (_: FormState, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const zodResult = loginSchema.safeParse({ email, password });
      const validatonErrors = zodResult.error?.format();

      if (!zodResult.success) {
        setFieldErrors({
          email: validatonErrors?.email?._errors[0] || "",
          password: validatonErrors?.password?._errors[0] || "",
        });
        return { email, password, error: "Validaton Error" };
      }

      const url = "http://localhost:3000/api/v1/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const jsonData = await response.json();
      if (!jsonData.success) {
        toast.error("Wrong Email or password");
        return { email, password, error: "Something went wrong" };
      }

      setAuthUser(jsonData.data);
      toast.success("Loged in successfully! ");
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Couldn't Login. Please try again.");
    }
    return { email, password };
  };

  const [state, formAction, isPending] = useActionState(submitForm, {
    email: "",
    password: "",
    error: undefined,
  });

  return (
    <div className="h-[calc(100svh-80px)] bg-gradient-to-br from-gray-50 to-white relative overflow-hidden flex items-center">
      {/* Decorative elements — same as Signup */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-red-600/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gray-900/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-10 w-4 h-4 bg-red-600 rotate-45 opacity-20"></div>
      <div className="absolute bottom-40 left-10 w-6 h-6 bg-gray-900 rotate-45 opacity-10"></div>

      <div className="w-full flex justify-center py-10 px-4 relative z-10">
        <div className="container w-full max-w-xl">
          {/* Header to match Signup */}
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              Login to your account
              <span className="text-red-600">.</span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent w-16" />
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              <div className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent w-16" />
            </div>
            <div className="text-gray-600 text-sm">
              Don't have any account?{" "}
              <NavLink
                to={"/signup"}
                className="text-red-600 hover:text-red-700 font-semibold underline">
                Signup
              </NavLink>
            </div>
          </div>

          {/* Card + form styled like Signup */}
          <div className="bg-white mt-6 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-900/5 backdrop-blur-sm">
            <form
              action={formAction}
              className="w-full flex flex-col gap-4">
              {/* Email */}
              <div>
                <div
                  className={`group ${
                    fieldErrors.email ? "ring-2 ring-red-500" : ""
                  } focus-within:ring-2 focus-within:ring-red-500 p-3 bg-gray-50 rounded-xl flex items-center justify-between gap-2 border border-gray-200 transition-all duration-300`}>
                  <div className="grow">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold block text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      onChange={() => clearFieldError("email")}
                      type="email"
                      name="email"
                      defaultValue={state.email}
                      id="email"
                      placeholder="user@example.com"
                      className="w-full text-base text-gray-900 font-medium bg-transparent outline-none placeholder-gray-400"
                    />
                  </div>
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-red-500 min-h-4 pl-1 pt-0.5">
                  {fieldErrors.email}
                </p>
              </div>

              {/* Password */}
              <div>
                <div
                  className={`group ${
                    fieldErrors.password ? "ring-2 ring-red-500" : ""
                  } focus-within:ring-2 focus-within:ring-red-500 p-3 bg-gray-50 rounded-xl flex items-center justify-between gap-2 border border-gray-200 transition-all duration-300`}>
                  <div className="grow">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold block text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      defaultValue={state.password}
                      onChange={() => clearFieldError("password")}
                      name="password"
                      placeholder="•••••••"
                      className="w-full text-base text-gray-900 font-medium bg-transparent outline-none placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }>
                    {showPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-red-500 min-h-4 pl-1 pt-0.5">
                  {fieldErrors.password}
                </p>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl py-3 text-base font-semibold mt-1 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 transition-all disabled:opacity-70 cursor-pointer">
                {isPending ? "Logging in..." : "Login"}
              </button>
              {/* other socila account login */}
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Or continue with
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => {}}
                    aria-label="Continue with Google"
                    className="flex items-center cursor-pointer justify-center gap-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow active:scale-[0.995]">
                    {/* Google SVG (keeps colors but subtle) */}
                    <span className="w-5 h-5">
                      <svg
                        viewBox="0 0 533.5 544.3"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-hidden>
                        <path
                          fill="#4285F4"
                          d="M533.5 278.4c0-17.5-1.6-35.3-4.9-52.3H272v98.9h146.9c-6.4 34.6-26.2 63.9-55.9 83.4v69.4h90.8c53.1-48.9 83.7-121 83.7-199.4z"
                        />
                        <path
                          fill="#34A853"
                          d="M272 544.3c73.7 0 135.6-24.4 180.9-66.4l-90.8-69.4c-25.1 17-57.4 27-90.1 27-69.2 0-127.8-46.6-148.9-109.2H30.1v68.6C74.6 486.6 168.8 544.3 272 544.3z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M123.1 327.9c-10.6-31.7-10.6-65.9 0-97.6V161.7H30.1c-40.2 79.2-40.2 172.9 0 252.1l93-85.9z"
                        />
                        <path
                          fill="#EA4335"
                          d="M272 107.7c37.9 0 72 13 98.9 38.6l73.9-73.9C403.1 24.9 345.1 0 272 0 168.8 0 74.6 57.7 30.1 142.4l93 85.9C144.2 154.3 202.8 107.7 272 107.7z"
                        />
                      </svg>
                    </span>

                    <span className="text-sm  font-semibold text-gray-700">
                      Google
                    </span>
                  </button>

                  {/* GitHub */}
                  <button
                    type="button"
                    onClick={() => {}}
                    aria-label="Continue with GitHub"
                    className="flex items-center cursor-pointer justify-center gap-3 py-2 rounded-lg border border-gray-200 bg-gray-900 text-white shadow-sm hover:shadow-md transition-shadow active:scale-[0.995]">
                    {/* GitHub (Lucide-style) */}
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden>
                      <path
                        d="M12 .5C5.73.5.86 5.37.86 11.63c0 4.78 3.09 8.84 7.38 10.27.54.1.74-.24.74-.52 0-.26-.01-1.13-.02-2.05-3 .65-3.63-1.45-3.63-1.45-.49-1.24-1.2-1.57-1.2-1.57-.98-.67.08-.66.08-.66 1.08.08 1.65 1.11 1.65 1.11.96 1.65 2.5 1.17 3.11.9.1-.7.38-1.17.69-1.44-2.4-.27-4.93-1.2-4.93-5.34 0-1.18.42-2.15 1.11-2.91-.11-.28-.48-1.42.11-2.96 0 0 .92-.29 3.02 1.11a10.5 10.5 0 0 1 2.75-.37c.93 0 1.87.12 2.75.37 2.1-1.41 3.02-1.11 3.02-1.11.59 1.54.22 2.68.11 2.96.69.76 1.11 1.73 1.11 2.91 0 4.15-2.53 5.07-4.94 5.33.39.34.73 1.01.73 2.03 0 1.46-.01 2.64-.01 3 0 .28.19.62.75.51 4.29-1.43 7.38-5.49 7.38-10.27C23.14 5.37 18.27.5 12 .5z"
                        fill="currentColor"
                      />
                    </svg>

                    <span className="text-sm font-semibold">
                      GitHub
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
