import { X } from "lucide-react"
import React, { SetStateAction, useActionState, useEffect, useRef } from "react"
import { userUpadteSchema } from "../schemas/update-user"
import { ZodFormattedError } from "zod"
import toast from "react-hot-toast"
import useUserStore from "../store/userStore"

interface PropsI {
  authorId: string
  setIsEditting: React.Dispatch<SetStateAction<boolean>>
  isEditting: boolean
}

interface FormState {
  firstname: string
  lastname: string
  error:
    | ZodFormattedError<
        {
          firstname: string
          lastname: string
        },
        string
      >
    | undefined
}

export default function ProfileEditForm({
  authorId,
  setIsEditting,
  isEditting,
}: PropsI) {
  const { setAuthUser, authUser } = useUserStore()

  const submitForm = async (formState: FormState, formData: FormData) => {
    const baseUrl = import.meta.env.VITE_BASE_SERVER_URL
    const firstname = formData.get("firstname") as string
    const lastname = formData.get("lastname") as string
    if (formState.firstname === firstname && lastname === formState.lastname) {
      toast("Please add some changes!")
      return {
        ...formState,
        firstname,
        lastname,
      }
    }
    const validationResult = userUpadteSchema.safeParse({
      firstname,
      lastname,
    })
    const validationError = validationResult.error?.format()
    if (!validationResult.success) {
      return {
        ...formState,
        firstname,
        lastname,
        error: validationError,
      }
    }
    // send the updates to the server
    try {
      const url = `${baseUrl}/users/update/${authorId}`
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname }),
        credentials: "include",
      })
      const jsonResponse = await response.json()
      if (!jsonResponse.success) {
        setIsEditting(false)
        toast.error("Couldn't update the user")
        return {
          ...formState,
        }
      }

      setAuthUser(jsonResponse.data)
      toast.success("Profile udpated successfully!")
      setIsEditting(false)
    } catch (error) {
      toast.error("Coudn't update the user")
      console.log(error)
    }
    return {
      ...formState,
      firstname,
      lastname,
      error: validationError,
    }
  }
  const [state, formAction, isPending] = useActionState(submitForm, {
    firstname: authUser?.firstname ?? "",
    lastname: authUser?.lastname ?? "",
    error: undefined,
  })
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setIsEditting(false)
      }
    }
    if (isEditting) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isEditting])

  useEffect(() => {
    if (isEditting) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isEditting])

  if (!isEditting) return

  return (
    isEditting && (
      <div className="profile-image-preview fixed inset-0 z-20  bg-black/75 flex items-center justify-center p-2">
        <div
          ref={boxRef}
          className={`bg-white rounded-lg w-full md:w-8/12 max-h-[75vh] p-8 flex flex-col items-center relative shadow-lg gorw-up`}
        >
          <div
            onClick={() => setIsEditting(false)}
            className="absolute top-2 right-2 text-xl cursor-pointer text-red-500 border-1 border-black bg-white rounded-full p-[1px]"
          >
            <X className="size-4 md:size-6" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Edit Profile
          </h2>

          <form action={formAction} className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="firstname"
                className="text-sm font-medium text-gray-600 mb-2"
              >
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
                className="text-sm font-medium text-gray-600 mb-2"
              >
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
            <div className={`error text-red-400 text-sm text-semibold h-4 `}>
              <p>
                {state?.error?.firstname?._errors ||
                  state?.error?.lastname?._errors}
              </p>
            </div>
            <button
              type="submit"
              className="bg-black text-white rounded-md py-2 mt-4 hover:bg-white border-1 hover:text-black hover:border-black transition-all duration-150"
            >
              {isPending ? "updating..." : "Save Changes"}
            </button>
          </form>
        </div>

        <style>
          {`
          .gorw-up {
          animation: slideIn 0.2s ease-in forwards;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            scale: 50%;
          }
          to {
            opacity: 1;
            scale:100%
          }
        }
        `}
        </style>
      </div>
    )
  )
}
