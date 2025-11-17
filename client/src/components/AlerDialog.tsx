import React from "react"
import toast from "react-hot-toast"

export default function AlerDialog({
  setIsAlert,
  blogId,
  setRefreshQuery,
}: {
  setIsAlert: React.Dispatch<React.SetStateAction<boolean>>
  blogId: string
  setRefreshQuery: () => void
}) {
  // handle blog delete
  const handleDelete = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_SERVER_URL}/blogs/${blogId}`
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      })
      if (!response.ok) {
        console.log(response)
        toast.error("Failed to delete, try again!")
      }
      const jsonResponse = await response.json()
      if (!jsonResponse.success) {
        toast.error("Fialed to delete, try again!")
        console.log(jsonResponse.message)
      }
      toast.success("Blog post deleted successfully!")
      setIsAlert(false)
      setRefreshQuery()
    } catch (error) {
      setIsAlert(false)
      console.log(error)
      toast.error("Something went, couldn't delete")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/45">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-4/5 max-w-96 h-48 border-white bg-gray-200 rounded-lg p-5 flex flex-col gap-5">
          <h3 className="font-bold text-2xl ">Are you sure?</h3>
          <p>This will delete your blog post completly!</p>
          <div className="text-center">
            <button
              onClick={() => setIsAlert(false)}
              className="w-2/5 bg-black text-white py-2 rounded-lg mr-3 cursor-pointer hover:scale-105 transition-all duration-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="w-2/5 bg-red-400 text-white py-2 rounded-lg ml-3 cursor-pointer hover:scale-105 transition-all duration-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
