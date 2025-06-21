import {
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import RecentBlogs from "../components/RecentBlogs";
import { useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { IPost } from "../types/Post";
import toast from "react-hot-toast";
import { IUser } from "../types/User";
import getSingleUser from "../utils/getUser";
import useGlobalStore from "../store/globalStore";
export default function Blog() {
  const [blogData, setBlogData] = useState<IPost>();
  const [authorDetails, setAuthorDetails] = useState<IUser>();
  const { isLoading, setIsLoading } = useGlobalStore();
  const params = useParams();
  const { blogId } = params;

  useEffect(() => {
    (async () => {
      // get blog data
      const url = `http://localhost:3000/api/v1/blogs/${blogId}`;
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          toast.error("Error, Something went wrong..");
          return;
        }
        const jsonResponse = await response.json();

        if (!jsonResponse.success) {
          toast.error(
            jsonResponse.message || "Can't fetch post data..."
          );

          return;
        }

        setBlogData(jsonResponse.post);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching post data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [blogId]);

  // get author details
  useEffect(() => {
    if (!blogData?.author) return;
    (async () => {
      const authorData: IUser = await getSingleUser(
        blogData?.author!
      );

      setAuthorDetails(authorData);
    })();
  }, [blogData]);

  return (
    <div className="w-full md:my-11">
      <div className="w-full flex">
        {/* blog details */}
        <div className="blog-detail w-full md:w-3/4">
          <div className="image bg-amber-400 w-full h-auto">
            <img
              className="w-full h-auto"
              src={`${blogData?.featuredImage || null}`}
              alt=""
            />
          </div>
          {/* Blog content */}
          <div className="Blog-content p-1 md:p-8">
            <div className="flex gap-4 items-center">
              <div className="category p-2 bg-red-400 text-white">
                {blogData?.category}
              </div>
              <div className="date text-sm text-gray-500">
                <Calendar className="inline size-[16px] mb-1" />{" "}
                <span className="">
                  {new Date(
                    blogData?.createdAt!
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
            {/* blog Title */}
            <h1 className="text-2xl md:text-4xl font-bold py-3 my-4">
              {!blogData && isLoading
                ? "Loading data..."
                : blogData?.title}
            </h1>
            {/* author details */}
            <div className="interactions flex gap-5 items-center my-7">
              <div className="author">
                <img
                  className="w-8 h-8"
                  src={`${
                    authorDetails?.profileImage
                      ? authorDetails.profileImage
                      : authorDetails?.gender === "male"
                      ? "https://avatar.iran.liara.run/public/41"
                      : "https://avatar.iran.liara.run/public/88"
                  }`}
                  alt=""
                />
              </div>
              <div className="likes">
                <Eye className="inline" /> <span>--</span>
              </div>
              <div className="likes">
                <Heart className="inline" />{" "}
                <span>{blogData?.likes.length}</span>
              </div>
              <div className="messages">
                <MessageCircle className="inline" />{" "}
                <span>{blogData?.comments.length}</span>
              </div>
            </div>

            {/* blog text */}

            <p
              dangerouslySetInnerHTML={{
                __html:
                  !blogData && isLoading
                    ? "Loading data..."
                    : blogData?.content!,
              }}
              className="text-lg text-gray-600"></p>
          </div>
          <div className="w-full h-[1px] bg-gray-500"></div>
          <div className="buttons w-full md:w-3/4 mx-auto flex gap-6 my-9 px-2 md:px-0">
            <div className="bg-blue-500 grow hover:bg-blue-700 text-white font-bold px-4 rounded flex items-center py-3 justify-center gap-3">
              <ThumbsUp className="inline" />{" "}
              <span>{blogData?.likes.length}</span>
            </div>
            <div className="bg-red-500 grow hover:bg-red-700 text-white font-bold  px-4 rounded flex items-center py-3 justify-center gap-3">
              <ThumbsDown />
            </div>
          </div>

          {/* comment-section */}

          <div className="comment-section w-full mx-auto mt-10 p-3 md:p-6 bg-white ">
            <p className="text-center text-2xl font-semibold text-gray-800 mb-4">
              Leave a Comment
            </p>
            <div className="cmnt-input flex w-full border border-gray-300 rounded-lg overflow-hidden">
              <textarea
                className="w-3/4 p-3 md:text-lg text-gray-600 outline-none resize-none"
                placeholder="Write your comment..."
              />
              <button className="w-1/4 bg-black text-white md:text-lg font-medium transition-all duration-300 hover:bg-gray-800">
                Post
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
                          Lorem ipsum dolor sit amet, consectetur
                          Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Architecto soluta nulla
                          assumenda cum, facere nostrum neque quam
                          sint quibusdam corrupti fugit quod magnam
                          tempora explicabo nam eaque nobis aliquid
                          nemo.
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
        </div>

        {/* Recent blogs component */}
        <RecentBlogs />
      </div>
    </div>
  );
}
