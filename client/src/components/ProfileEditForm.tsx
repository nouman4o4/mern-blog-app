import { X } from "lucide-react";
import React, { SetStateAction, useActionState } from "react";
import { userUpadteSchema } from "../schemas/update-user";
import { ZodFormattedError } from "zod";

interface PropsI {
  firstName: string;
  lastName: string;
  setIsEditting: React.Dispatch<SetStateAction<boolean>>;
  isEditting: boolean;
}

interface FormState {
  firstname: string;
  lastname: string;
  error:
    | ZodFormattedError<
        {
          firstname: string;
          lastname: string;
        },
        string
      >
    | undefined;
}

export default function ProfileEditForm({
  firstName,
  lastName,
  setIsEditting,
  isEditting,
}: PropsI) {
  const submitForm = (formState: FormState, formData: FormData) => {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    if (
      formState.firstname === firstname &&
      lastname === formState.lastname
    ) {
      return {
        ...formState,
        firstname,
        lastname,
      };
    }
    const validationResult = userUpadteSchema.safeParse({
      firstname,
      lastname,
    });

    if (!validationResult.success) {
      return {
        ...formState,
        firstname,
        lastname,
        error: validationResult.error?.format(),
      };
    }
    // send the updates to the server
  };
  const [state, formAction, isPending] = useActionState(submitForm, {
    firstname: firstName,
    lastname: lastName,
    error: { firstname: "", lastname: "" },
  });

  return (
    <div className="profile-image-preview absolute top-0 left-0 z-20 h-screen w-screen bg-black/75 flex items-center justify-center p-2">
      <div
        className={`bg-white rounded-lg w-full md:w-8/12 max-h-[75vh] p-8 flex flex-col items-center relative shadow-lg transition-all duration-900 ${
          isEditting ? "scale-100" : "scale-0"
        }`}>
        <div
          onClick={() => setIsEditting(false)}
          className="absolute top-2 right-2 text-xl cursor-pointer text-red-500 border-1 border-black bg-white rounded-full p-[1px]">
          <X className="size-4 md:size-6" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Edit Profile
        </h2>

        <form
          action={formAction}
          className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-gray-600 mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue={state?.firstname}
              name="firstname"
              id="firstname"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-600 mb-2">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={state?.lastname}
              name="lastname"
              id="lastname"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
            />
          </div>
          <div
            className={`error text-red-400 text-sm text-semibold h-4 `}>
            <p>
              {state?.error?.firstname?._errors ||
                state?.error?.lastname?._errors}
            </p>
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-md py-2 mt-4 hover:bg-white border-1 hover:text-black hover:border-black transition-all duration-150">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
