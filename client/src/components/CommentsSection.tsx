import { useEffect, useState } from "react"
import { IPost } from "../types/Post"
import { LucideThumbsUp } from "lucide-react"
import { motion } from "framer-motion"
import useUserStore from "../store/userStore"
import toast from "react-hot-toast"

interface IComment {
  text: string
  user: {
    firstname: string
    lastname: string
    profileImage: {
      secureUrl: string
    }
    gender: string
  }
  likes: string[]
  createdAt: Date
  _id: string
}

export default function CommentsSection({ blogData }: { blogData: IPost }) {
  const [comment, setComment] = useState("")
  const [isLoading, setIsloading] = useState(false)
  const [comments, setComments] = useState<IComment[] | null>(null)

  const { authUser } = useUserStore()

  // 🔁 REFRESH COMMENTS
  const refreshComments = async () => {
    if (!blogData?._id) return
    try {
      const uri = `${import.meta.env.VITE_BASE_SERVER_URL}/blogs/${
        blogData._id
      }/comments`
      const response = await fetch(uri, {
        method: "GET",
        credentials: "include",
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        console.log(json.message || "Error fetching comments")
        return
      }

      setComments(json.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    refreshComments()
  }, [blogData?._id]) // Only on mount or blog change

  // 📝 SUBMIT COMMENT
  const handleSubmit = async () => {
    if (comment.trim().length < 3) return

    const uri = `${import.meta.env.VITE_BASE_SERVER_URL}/blogs/${
      blogData._id
    }/comments`

    try {
      setIsloading(true)
      const response = await fetch(uri, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        toast.error(json.message || "Error posting comment")
        return
      }

      toast.success("Comment added successfully")
      setComment("")
      refreshComments()
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  // Handle like
  const handleLikeComment = async (commentId: string) => {
    const uri = `${import.meta.env.VITE_BASE_SERVER_URL}/blogs/${
      blogData._id
    }/comments/${commentId}/like`

    try {
      const response = await fetch(uri, {
        method: "PATCH",
        credentials: "include",
      })

      const json = await response.json()
      if (!response.ok || !json.success) {
        toast.error(json.message || "Error liking comment")
        return
      }

      // Instant UI feedback
      setComments((prev) =>
        prev
          ? prev.map((c) => {
              if (c._id !== commentId) return c

              const userId = authUser?._id

              if (!userId) return c

              const alreadyLiked = c.likes.includes(userId)

              return {
                ...c,
                likes: alreadyLiked
                  ? c.likes.filter((id) => id !== userId) // remove
                  : [...c.likes, userId], // add
              }
            })
          : prev
      )

      // Optional: light refresh
      refreshComments()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="comment-section w-full mx-auto mt-10 p-3 md:p-6 bg-white">
      <p className="text-center text-2xl font-semibold text-gray-800 mb-4">
        Leave a Comment
      </p>

      {/* INPUT */}
      <div className="cmnt-input flex w-full border border-gray-300 rounded-lg overflow-hidden">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-3/4 p-3 text-gray-600 outline-none resize-none"
        />

        <button
          disabled={comment.trim().length < 3}
          onClick={handleSubmit}
          className={`w-1/4 md:text-lg ${
            comment.trim().length < 3
              ? "bg-black/40 text-gray-200 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          } transition-all`}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* COMMENTS */}
      <div className="cmnts-container my-6 text-gray-800">
        <h4 className="text-lg font-bold border-b pb-2 my-3">Comments</h4>

        {comments && comments.length > 0 ? (
          comments.map((comment, i) => {
            const safeLikes = comment.likes ?? []

            const isLiked = authUser?._id
              ? safeLikes.includes(authUser._id.toString())
              : false
            console.log(isLiked)
            const isNew = i === 0

            const Wrapper = isNew ? motion.div : "div"

            return (
              <Wrapper
                key={comment._id}
                layout
                initial={isNew ? { opacity: 0, y: -20 } : false}
                animate={isNew ? { opacity: 1, y: 0 } : false}
                transition={isNew ? { duration: 0.4 } : undefined}
                className="comment max-w-2xl flex gap-2 my-8 p-2 shadow-lg rounded-xl"
              >
                {/* Profile image */}
                <div className="profile-img w-10 h-10 shrink-0">
                  <img
                    className="rounded-full w-full h-full"
                    src={
                      comment.user.profileImage?.secureUrl ||
                      (comment.user.gender === "male"
                        ? "https://avatar.iran.liara.run/public/41"
                        : "https://avatar.iran.liara.run/public/88")
                    }
                    alt=""
                  />
                </div>

                {/* Body */}
                <div className="comment-body px-2 grow">
                  <div className="flex justify-between">
                    <h3 className="font-bold">
                      {comment.user.firstname} {comment.user.lastname}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()} —{" "}
                      {new Date(comment.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-1">{comment.text}</p>

                  {/* Like button */}
                  <div className="flex items-center justify-end py-3 select-none">
                    <button
                      onClick={() => handleLikeComment(comment._id)}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      {isLiked ? (
                        <LucideThumbsUp
                          className="
                              size-6 
                              text-blue-600 
                              fill-blue-600 
                              transition-transform 
                              duration-150 
                              group-active:scale-90
                            "
                        />
                      ) : (
                        <LucideThumbsUp
                          className="
                              size-6 
                              text-gray-500 
                              transition-transform 
                              duration-150 
                              group-active:scale-90
                            "
                        />
                      )}

                      <p
                        className={`text-sm transition-colors duration-150 ${
                          isLiked
                            ? "text-blue-600 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        {comment.likes.length}
                      </p>
                    </button>
                  </div>
                </div>
              </Wrapper>
            )
          })
        ) : (
          <div className="text-center text-sm font-semibold">
            No Comments yet
          </div>
        )}
      </div>
    </div>
  )
}
