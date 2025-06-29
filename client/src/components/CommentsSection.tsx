import React, { useState } from "react";
import { IPost } from "../types/Post";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function CommentsSection({
  blogData,
}: {
  blogData: IPost;
}) {
  const [comment, setComment] = useState<string>();
  const [isLoading, setIsloading] = useState(false);
  const handleSubmit = () => {
    // call api
    console.log(comment);
  };

  return (
    <div className="comment-section w-full mx-auto mt-10 p-3 md:p-6 bg-white ">
      <p className="text-center text-2xl font-semibold text-gray-800 mb-4">
        Leave a Comment
      </p>

      <div className="cmnt-input flex w-full border border-gray-300 rounded-lg overflow-hidden">
        <textarea
          onChange={(e) => setComment(e.currentTarget.value)}
          name="comment"
          id="comment"
          className="w-3/4 p-1 md:p-3 md:text-lg text-gray-600 outline-none resize-none"
          placeholder="Write your comment..."
        />
        <button
          onClick={handleSubmit}
          className="w-1/4 bg-black text-white md:text-lg font-medium transition-all duration-300 hover:bg-gray-800">
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* comments container*/}

      <div className="cmnts-container my-6 text-gray-800">
        <h4 className="text-lg font-bold border-b pb-2 my-3">
          Comments
        </h4>

        {/* comment */}
        {blogData && blogData?.comments.length > 0 ? (
          [1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="comment max-w-2xl flex gap-2 my-8 p-2 shadow-lg rounded-xl">
              <div className="profile-img w-10 h-10 shrink-0">
                <img
                  className="rounded-full w-full h-full"
                  src="https://i.pravatar.cc/40"
                  alt=""
                />
              </div>
              {/* comment */}
              <div className="comment-body px-2">
                <div>
                  <div className="flex justify-between gap-8 items-center">
                    <h3 className="font-bold ">John Doe</h3>{" "}
                    <span className="text-[12px] text-gray-400 ">
                      2/18/2025, 9:29:13 PM
                    </span>
                  </div>
                  <p className="text-gray-60">
                    Lorem ipsum dolor sit amet, consectetur Lorem
                    ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto soluta nulla assumenda cum, facere
                    nostrum neque quam sint quibusdam corrupti fugit
                    quod magnam tempora explicabo nam eaque nobis
                    aliquid nemo.
                  </p>
                </div>
                <div className="flex items-center gap-6 py-3 text-gray-500 ">
                  <div className="">
                    {" "}
                    <ThumbsUp className="size-6 inline mr-1 cursor-pointer" />
                    <p className="text-sm inline-block">45k</p>
                  </div>
                  <div>
                    {" "}
                    <ThumbsDown className="size-6 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-sm font-semibold">
            No Comments yet
          </div>
        )}
      </div>
    </div>
  );
}
