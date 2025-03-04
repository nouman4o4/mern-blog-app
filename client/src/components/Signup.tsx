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
  // clear error field
  const clearErrorField = (field: keyof FieldErrorsI) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };
  // submit form
  const submitForm = async (
    state: FormState,
    formData: FormData
  ): Promise<FormState> => {
    // Form submission logic here

    // try {
    //
    //
    //   // const email = formData.get("email");
    //   // const firstname = formData.get("firstname");
    //   // const lastname = formData.get("lastname");
    //   // const password = formData.get("password");
    //   // console.log(email, firstname, lastname, password);
    // } catch (error) {
    //   console.error(error);
    // }

    // const formDataObj = Object.fromEntries(formData.entries());
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
      console.log(formDataObj);

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

      // api call
      const url = "http://localhost:3000/api/users/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="absolute top-0 left-0 w-full flex itemscenter justify-start text-white">
      <div className="container w-full md:w-[700px] px-4 md:px-6 md:pb-0">
        <h1 className="text-2xl md:text-3xl font-bold my-2">
          Create new account
          <span className="text-red-500">.</span>
        </h1>{" "}
        <div className="text-gray-300 my-1">
          Already a member?{" "}
          <NavLink to={"/login"} className="text-red-400 underline">
            Login
          </NavLink>
        </div>
        {/* Form */}
        <div>
          <form
            action={formAction}
            className="w-full mt-5 flex flex-col justify-center gap-1 md:gap-3">
            {/* nameInputs */}
            <div className="name-inputs w-full flex gap-4 flex-wrap">
              <div className="grow">
                <div
                  className={`input group focus-within:ring-2 ${
                    fieldErrors.firstname
                      ? "focus-within:ring-red-400"
                      : "focus-within:ring-blue-400"
                  } p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3 ${
                    fieldErrors.firstname ? "ring-2 ring-red-400" : ""
                  }`}>
                  <div>
                    <label
                      htmlFor="firstname"
                      className="text-[12px] text-lg font-semibold block text-gray-300 my-1">
                      Firstname
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Jhon"
                      defaultValue={state.firstname}
                      onChange={() => clearErrorField("firstname")}
                      className="md:text-lg tracking-wider text-white p-1 font-semibold ring-0 outline-none"
                    />
                  </div>
                  <div>
                    <User />
                  </div>
                </div>
                <p className="text-sm text-red-400 h-5 pl-2 p-1 w-fit">
                  {fieldErrors.firstname}
                </p>
              </div>
              <div className="grow">
                <div
                  className={`input group focus-within:ring-2 ${
                    fieldErrors.lastname
                      ? "focus-within:ring-red-400"
                      : "focus-within:ring-blue-400"
                  } p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3 ${
                    fieldErrors.lastname ? "ring-2 ring-red-400" : ""
                  }`}>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="text-[12px] font-semibold block text-gray-300 my-1">
                      Lastname
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Doe"
                      defaultValue={state.lastname}
                      onChange={() => clearErrorField("lastname")}
                      className=" md:text-lg text-white p-1 font-semibold tracking-wider ring-0 outline-none"
                    />
                  </div>
                  <div>
                    <User />
                  </div>
                </div>
                <p className="text-sm text-red-400 h-5 pl-2 p-1 w-fit">
                  {fieldErrors.lastname}
                </p>
              </div>
            </div>
            {/* email and gender */}
            <div className="email&gender-inputs w-full flex gap-4 flex-wrap mt-2 md:mt-2">
              <div className="grow">
                <div
                  className={`input group focus-within:ring-2 ${
                    fieldErrors.email
                      ? "focus-within:ring-red-400"
                      : "focus-within:ring-blue-400"
                  } p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3 ${
                    fieldErrors.email ? "ring-2 ring-red-400" : ""
                  }`}>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-[12px] text-lg font-semibold block text-gray-300 my-1">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="true"
                      defaultValue={state.email}
                      placeholder="Jhon@example.com"
                      onChange={() => clearErrorField("email")}
                      className="md:text-lg tracking-wider text-white p-1 font-semibold ring-0 outline-none"
                    />
                  </div>
                  <div>
                    <Mail />
                  </div>
                </div>
                <p className="text-sm text-red-400 h-5 pl-2 p-1">
                  {fieldErrors.email}
                </p>
              </div>
              <div className="grow">
                <div
                  className={`input group focus-within:ring-2  ${
                    fieldErrors.gender
                      ? "focus-within:ring-red-400"
                      : "focus-within:ring-blue-400"
                  } p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3 ${
                    fieldErrors.gender ? "ring-2 ring-red-400" : ""
                  } py-[9px] md:py-[14px]`}>
                  <div className="grow">
                    <div className="text-[12px] font-semibold block text-gray-300 my-1">
                      Gender
                    </div>
                    <div className="flex justify-around items-center">
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          className="size-5"
                          defaultChecked={state.gender === "male"}
                          onChange={() => clearErrorField("gender")}
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          className="size-5"
                          defaultChecked={state.gender === "female"}
                          onChange={() => clearErrorField("gender")}
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <UserCog2 />
                  </div>
                </div>
                <p className="text-sm text-red-400 h-4 md:h pl-2 p-1">
                  {fieldErrors.gender}
                </p>
              </div>
            </div>

            {/* password */}
            <div className="passoword-input w-full mt-2 md:mt-2">
              <div
                className={`input group focus-within:ring-2 ${
                  fieldErrors.password
                    ? "focus-within:ring-red-400"
                    : "focus-within:ring-blue-400"
                } p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3 ${
                  fieldErrors.password ? "ring-2 ring-red-400" : ""
                }`}>
                <div className="grow ">
                  <label
                    htmlFor="password"
                    className="text-[12px] font-semibold block text-gray-300 my-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="•••••••"
                    defaultValue={state.password}
                    onClick={() => clearErrorField("password")}
                    className="w-full tracking-wider md:text-lg text-white p-1 font-semibold ring-0 outline-none"
                  />
                </div>
                <div
                  className="text-gray-200 py-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
              <p className="text-red-400 h-4 md:h pl-2 p-1">
                {fieldErrors.password}
              </p>
            </div>

            {/* confirm password */}
            <div className="confirmPassword-input w-full gap-4 mt-2 md:mt-2">
              <div
                className={`input group focus-within:ring-2 ${
                  fieldErrors.confirmPassword
                    ? "focus-within:ring-red-400"
                    : "focus-within:ring-blue-400"
                } p-1 px-3 md:px-4 md:p-2 pr-4 bg-gray-600 rounded-xl grow flex items-center justify-between gap-3 ${
                  fieldErrors.confirmPassword
                    ? "ring-2 ring-red-400"
                    : ""
                }`}>
                <div className="grow ">
                  <label
                    htmlFor="confrimPassword"
                    className="text-[12px] font-semibold block text-gray-300 my-1">
                    Confirmt Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confrimPassword"
                    placeholder="•••••••"
                    defaultValue={state.confirmPassword}
                    className="w-full  md:text-lg text-white p-1 font-semibold ring-0 outline-none"
                  />
                </div>
                <div>
                  <EyeOff className="text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-red-400 h-4 md:h pl-2 p-1">
                {fieldErrors.confirmPassword}
              </p>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 rounded-3xl py-2 md:py-3 text-lg md:text-xl font-semibold mt-3">
              {isPending ? "Account Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
