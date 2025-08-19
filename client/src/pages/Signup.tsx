import { Eye, EyeOff, Mail, User, UserCog2 } from "lucide-react";
import { useActionState, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { signUpSchema } from "../schemas/signUpSchema";
import toast from "react-hot-toast";

type FormState = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  error?: string;
};
interface FieldErrorsI {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrorsI>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const clearErrorField = (field: keyof FieldErrorsI) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const submitForm = async (
    state: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const formDataObj = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      gender: formData.get("gender") as string,
    };
    try {
      const zodResult = signUpSchema.safeParse(formDataObj);
      const validatonError = zodResult.error?.format();

      if (!zodResult.success) {
        setFieldErrors({
          firstname: validatonError?.firstname?._errors[0] as string,
          lastname: validatonError?.lastname?._errors[0] as string,
          email: validatonError?.email?._errors[0] as string,
          password: validatonError?.password?._errors[0] as string,
          confirmPassword: validatonError?.confirmPassword
            ?._errors[0] as string,
          gender: validatonError?.gender?._errors[0] as string,
        });
        return { ...formDataObj, error: "" };
      }

      const url = "http://localhost:3000/api/v1/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
        credentials: "include",
      });
      const jsonResponse = await response.json();

      if (!jsonResponse.success) {
        toast.error(jsonResponse.message);
        return { ...formDataObj, error: "Server error" };
      }

      toast.success("User Registerd successfully");
      navigate("/login");
      return formDataObj;
    } catch (error: any) {
      console.log(error.message);
      toast.error("An unexpected error occured, Please try again.");
      return { ...formDataObj, error: "An unexpected error occured" };
    }
  };

  const [state, formAction, isPending] = useActionState(submitForm, {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    error: undefined,
  });

  return (
    <div className="h-[calc(100svh-80px)] bg-gradient-to-br from-gray-50 to-white relative overflow-hidden flex items-center">
      <div className="hidden md:block absolute top-0 left-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute top-20 right-20 w-56 h-56 bg-red-600/10 rounded-full blur-2xl" />
      <div className="hidden md:block absolute bottom-20 left-20 w-64 h-64 bg-gray-900/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute top-40 right-10 w-3 h-3 bg-red-600 rotate-45 opacity-20" />
      <div className="hidden md:block absolute bottom-40 left-10 w-4 h-4 bg-gray-900 rotate-45 opacity-10" />

      <div className="w-full flex items-center justify-center py-4 px-4 relative z-10">
        <div className="container w-full max-w-xl">
          {/* Header (tighter) */}
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              Create new account
              <span className="text-red-600">.</span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent w-16" />
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              <div className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent w-16" />
            </div>
            <div className="text-gray-600 text-sm">
              Already a member?{" "}
              <NavLink
                to={"/login"}
                className="text-red-600 hover:text-red-700 font-semibold underline">
                Login
              </NavLink>
            </div>
          </div>

          {/* Form card (compact) */}
          <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-900/5 backdrop-blur-sm">
            <form
              action={formAction}
              className="w-full flex flex-col gap-4">
              {/* Name inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div
                    className={`group ${
                      fieldErrors.firstname
                        ? "ring-2 ring-red-500"
                        : ""
                    } focus-within:ring-2 focus-within:ring-red-500 p-3 bg-gray-50 rounded-lg flex items-center justify-between gap-2 border border-gray-200 transition-all duration-300`}>
                    <div className="flex-grow leading-tight">
                      <label
                        htmlFor="firstname"
                        className="text-xs font-semibold block text-gray-700 mb-1">
                        Firstname
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="John"
                        defaultValue={state.firstname}
                        onChange={() => clearErrorField("firstname")}
                        className="text-base text-gray-900 font-medium bg-transparent w-full outline-none placeholder-gray-400"
                      />
                    </div>
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-red-500 min-h-4 pl-1 pt-0.5">
                    {fieldErrors.firstname}
                  </p>
                </div>

                <div>
                  <div
                    className={`group ${
                      fieldErrors.lastname
                        ? "ring-2 ring-red-500"
                        : ""
                    } focus-within:ring-2 focus-within:ring-red-500 p-3 bg-gray-50 rounded-lg flex items-center justify-between gap-2 border border-gray-200 transition-all duration-300`}>
                    <div className="flex-grow leading-tight">
                      <label
                        htmlFor="lastname"
                        className="text-xs font-semibold block text-gray-700 mb-1">
                        Lastname
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Doe"
                        defaultValue={state.lastname}
                        onChange={() => clearErrorField("lastname")}
                        className="text-base text-gray-900 font-medium bg-transparent w-full outline-none placeholder-gray-400"
                      />
                    </div>
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-red-500 min-h-4 pl-1 pt-0.5">
                    {fieldErrors.lastname}
                  </p>
                </div>
              </div>

              {/* Email and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div
                    className={`group ${
                      fieldErrors.email ? "ring-2 ring-red-500" : ""
                    } focus-within:ring-2 focus-within:ring-red-500 p-3 bg-gray-50 rounded-lg flex items-center justify-between gap-2 border border-gray-200 transition-all duration-300`}>
                    <div className="flex-grow leading-tight">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold block text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="true"
                        defaultValue={state.email}
                        placeholder="john@example.com"
                        onChange={() => clearErrorField("email")}
                        className="text-base text-gray-900 font-medium bg-transparent w-full outline-none placeholder-gray-400"
                      />
                    </div>
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-red-500 min-h-4 pl-1 pt-0.5">
                    {fieldErrors.email}
                  </p>
                </div>

                <div>
                  <div
                    className={`group ${
                      fieldErrors.gender ? "ring-2 ring-red-500" : ""
                    } focus-within:ring-2 focus-within:ring-red-500 p-3 bg-gray-50 rounded-lg flex items-center justify-between gap-2 border border-gray-200 transition-all duration-300`}>
                    <div className="flex-grow">
                      <div className="text-xs font-semibold block text-gray-700 mb-2">
                        Gender
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            className="w-4 h-4 text-red-600 accent-red-600 cursor-pointer"
                            defaultChecked={state.gender === "male"}
                            onChange={() => clearErrorField("gender")}
                          />
                          <span className="text-sm text-gray-700 font-medium">
                            Male
                          </span>
                        </label>
                        <label className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            className="w-4 h-4 text-red-600 accent-red-600 cursor-pointer"
                            defaultChecked={state.gender === "female"}
                            onChange={() => clearErrorField("gender")}
                          />
                          <span className="text-sm text-gray-700 font-medium">
                            Female
                          </span>
                        </label>
                      </div>
                    </div>
                    <UserCog2 className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-red-500 min-h-4 pl-1 pt-0.5">
                    {fieldErrors.gender}
                  </p>
                </div>
              </div>

              {/* Password */}
              <div>
                <div
                  className={`group ${
                    fieldErrors.password ? "ring-2 ring-red-500" : ""
                  } focus-within:ring-2 focus-within:ring-red-500 p-3 bg-gray-50 rounded-lg flex items-center justify-between gap-2 border border-gray-200 transition-all duration-300`}>
                  <div className="flex-grow leading-tight">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold block text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="•••••••"
                      defaultValue={state.password}
                      onClick={() => clearErrorField("password")}
                      className="text-base text-gray-900 font-medium bg-transparent w-full outline-none placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 p-1"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }>
                    {showPassword ? (
                      <Eye className="w-4 h-4 cursor-pointer" />
                    ) : (
                      <EyeOff className="w-4 h-4 cursor-pointer" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-red-500 min-h-4 pl-1 pt-0.5">
                  {fieldErrors.password}
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <div
                  className={`group ${
                    fieldErrors.confirmPassword
                      ? "ring-2 ring-red-500"
                      : ""
                  } focus-within:ring-2 focus-within:ring-red-500 p-3 bg-gray-50 rounded-lg flex items-center justify-between gap-2 border border-gray-200 transition-all duration-300`}>
                  <div className="flex-grow leading-tight">
                    <label
                      htmlFor="confirmPassword"
                      className="text-xs font-semibold block text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="•••••••"
                      defaultValue={state.confirmPassword}
                      className="text-base text-gray-900 font-medium bg-transparent w-full outline-none placeholder-gray-400"
                    />
                  </div>

                  <EyeOff className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-red-500 min-h-4 pl-1 pt-0.5">
                  {fieldErrors.confirmPassword}
                </p>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-lg text-base mt-1">
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Account Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
