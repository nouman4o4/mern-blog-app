import { Contact, Eye, EyeOff, Mail } from "lucide-react";
import { useActionState, useState } from "react";
import { NavLink } from "react-router";
import { loginSchema } from "../schemas/loginSchema";

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

  const submitForm = async (_: FormState, formData: FormData) => {
    // Form submission logic here

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const zodResult = loginSchema.safeParse({ email, password });
      const validatonError = zodResult.error?.format();

      if (!zodResult.success) {
        setFieldErrors({
          email: validatonError?.email?._errors[0] as string,
          password: validatonError?.password?._errors[0] as string,
        });

        return {
          email,
          password,
          error: "Validaton Error",
        };
      }
    } catch (error: any) {
      console.log(error.message);
    }
    return { email, password };
  };

  const [state, formAction, isPending] = useActionState(submitForm, {
    email: "",
    password: "",
    error: undefined,
  });

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
          <form
            action={formAction}
            className="w-full b-gray-700 mt-6 flex flex-col justify-center gap-1 md:gap-3">
            {/* email */}
            <div className="name-inputs w-full mt-3">
              <div
                className={`input group focus-within:ring-2 ${
                  fieldErrors.email
                    ? "focus-within:ring-red-400"
                    : "focus-within:ring-blue-400"
                } p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3 ${
                  fieldErrors.email ? "ring-2 ring-red-400" : ""
                }`}>
                <div className="grow ">
                  <label
                    htmlFor="email"
                    className="text-[12px] font-semibold block text-gray-300 my-1">
                    Email
                  </label>
                  <input
                    onInput={(e) =>
                      console.log(e.currentTarget.value)
                    }
                    onChange={() => {
                      setFieldErrors({ ...fieldErrors, email: "" });
                      console.log(fieldErrors);
                    }}
                    type="email"
                    name="email"
                    defaultValue={state.email}
                    id="email"
                    placeholder="user@example.com"
                    className="w-full tracking-wider md:text-lg text-white p-1 font-semibold ring-0 outline-none"
                  />
                </div>
                <div>
                  <Mail />
                </div>
              </div>
              <p className="text-red-400 h-5 pl-2 p-1">
                {fieldErrors.email}
              </p>
            </div>

            {/* password */}
            <div className="name-inputs w-full mt-3">
              <div
                className={`input group focus-within:ring-2 ${
                  fieldErrors.password
                    ? "focus-within:ring-red-400"
                    : "focus-within:ring-blue-400"
                } p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3 ${
                  fieldErrors.password ? "ring-2 ring-red-400" : ""
                }`}>
                <div className="grow">
                  <label
                    htmlFor="password"
                    className="text-[12px] font-semibold block text-gray-300 my-1">
                    Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    defaultValue={state.password}
                    onChange={() =>
                      setFieldErrors({ ...fieldErrors, password: "" })
                    }
                    name="password"
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
              <p className="text-red-400 h-5 pl-2 p-1">
                {fieldErrors.password}
              </p>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-500 rounded-3xl py-2 md:py-3 text-lg md:text-xl font-semibold mt-3">
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
