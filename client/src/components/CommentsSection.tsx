import React, { useEffect, useState } from "react";
import { IPost } from "../types/Post";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";

interface IComment {
  text: string;
  user: {
    firstname: string;
    lastname: string;
    profileImage: {
      secureUrl: string;
    };
    gender: string;
  };
  likes: string[];
  createdAt: Date;
  _id: string;
}

export default function CommentsSection({
  blogData,
}: {
  blogData: IPost;
}) {
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsloading] = useState(false);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [isliked, setIsliked] = useState<boolean>();

  const { authUser } = useUserStore();

  // submit create comment
  const handleSubmit = async () => {
    if (comment?.trim().length < 3) {
      return;
    }
    // call api

    const uri = `${import.meta.env.VITE_BASE_SERVER_URL}/blogs/${
      blogData._id
    }/comments`;
    try {
      setIsloading(true);
      const response = await fetch(uri, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });

      const jsonResponse = await response.json();
      if (!response.ok) {
        console.log("Error posting comment");
        return;
      }
      if (!jsonResponse.success) {
        console.log(
          jsonResponse.message || "Can't post comment data..."
        );
        return;
      }
      toast.success("Comment added successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
      setComment("");
    }
  };

  useEffect(() => {
    blogData &&
      (async () => {
        if (!blogData._id) return;
        // get all comments for the blog post
        try {
          const uri = `${
            import.meta.env.VITE_BASE_SERVER_URL
          }/blogs/${blogData._id}/comments`;
          const response = await fetch(uri, {
            method: "GET",
            credentials: "include",
          });
          if (!response.ok) {
            console.log("Error fetching comments");
            return;
          }
          const jsonResponse = await response.json();
          if (!jsonResponse.success) {
            console.log(
              jsonResponse.message || "Can't fetch comments data..."
            );
            return;
          }

          setComments(jsonResponse.data);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [isLoading, blogData, isliked]);

  const handleLikeComment = async (commentId: string) => {
    const uri = `${import.meta.env.VITE_BASE_SERVER_URL}/blogs/${
      blogData._id
    }/comments/${commentId}/like`;
    try {
      const response = await fetch(uri, {
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error liking a comment");
        return;
      }

      const jsonResonse = await response.json();
      if (!jsonResonse.success) {
        toast.error(jsonResonse.message || "Error liking a comment");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment-section w-full mx-auto mt-10 p-3 md:p-6 bg-white ">
      <p className="text-center text-2xl font-semibold text-gray-800 mb-4">
        Leave a Comment
      </p>

      <div className="cmnt-input flex w-full border border-gray-300 rounded-lg overflow-hidden">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          name="comment"
          id="comment"
          className="w-3/4 p-1 md:p-3 md:text-lg text-gray-600 outline-none resize-none"
          placeholder="Write your comment..."
        />

        <button
          disabled={comment.trim().length < 3}
          onClick={handleSubmit}
          className={`w-1/4 md:text-lg ${
            comment.trim().length < 3
              ? "bg-black/40 text-gray-200 hover:bg-black/40 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800  cursor-pointer"
          } font-medium transition-all duration-300`}>
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* comments container*/}

      <div className="cmnts-container my-6 text-gray-800">
        <h4 className="text-lg font-bold border-b pb-2 my-3">
          Comments
        </h4>

        {/* comment */}

        {blogData && comments ? (
          comments.map((comment, i) => {
            const isLikedByCurrentUser = comment.likes.some(
              (id) => id.toString() === authUser?._id
            );
            const isNew = i === 0;
            const CommentWrapper = isNew ? motion.div : "div";
            // animation not wokring properly. fix it later
            return (
              <CommentWrapper
                key={i}
                layout
                initial={isNew ? { opacity: 0, y: -20 } : false}
                animate={isNew ? { opacity: 1, y: 0 } : false}
                transition={
                  isNew
                    ? { duration: 0.4, ease: "easeInOut" }
                    : undefined
                }
                className="comment max-w-2xl flex gap-2 my-8 p-2 shadow-lg rounded-xl">
                <div className="profile-img w-10 h-10 shrink-0">
                  <img
                    className="rounded-full w-full h-full"
                    src={
                      comment?.user.profileImage?.secureUrl
                        ? comment.user.profileImage.secureUrl
                        : comment?.user.gender === "male"
                        ? "https://avatar.iran.liara.run/public/41"
                        : "https://avatar.iran.liara.run/public/88"
                    }
                    alt=""
                  />
                </div>
                {/* comment */}
                <div className="comment-body px-2 grow">
                  <div>
                    <div className="flex justify-between gap-8 items-center">
                      <h3 className="font-bold ">
                        {comment.user.firstname +
                          " " +
                          comment.user.lastname}
                      </h3>{" "}
                      <span className="text-[12px] text-gray-400 ">
                        {new Date(
                          comment.createdAt
                        ).toLocaleDateString()}
                        ,{" "}
                        {new Date(
                          comment.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                      </span>
                    </div>
                    <p className="text-gray-60">{comment.text}</p>
                  </div>
                  <div className="flex items-center justify-end py-3 text-gray-500 px-3">
                    <div className="">
                      {" "}
                      <ThumbsUp
                        fill={
                          isLikedByCurrentUser ? "black" : "white"
                        }
                        onClick={() => {
                          handleLikeComment(comment._id);
                          setIsliked(!isliked);
                        }}
                        className="size-6 inline mr-1 cursor-pointer"
                      />
                      <p className="text-sm inline-block ml-2">
                        {comment.likes?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </CommentWrapper>
            );
          })
        ) : (
          <div className="text-center text-sm font-semibold">
            No Comments yet
          </div>
        )}
      </div>
    </div>
  );
}
