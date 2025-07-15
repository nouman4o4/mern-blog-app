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
import { useEffect, useState } from "react";
import { IPost } from "../types/Post";
import toast from "react-hot-toast";
import { IUser } from "../types/User";
import getSingleUser from "../utils/getUser";
import useGlobalStore from "../store/globalStore";
import useUserStore from "../store/userStore";
import CommentsSection from "../components/CommentsSection";
// import 'dotenv/config'
export default function Blog() {
  const [blogData, setBlogData] = useState<IPost>();
  const [authorDetails, setAuthorDetails] = useState<IUser>();
  const { isLoading, setIsLoading } = useGlobalStore();
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const params = useParams();
  const { blogId } = params;
  const { authUser } = useUserStore();

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
  }, [blogId, alreadyLiked]);

  // get author details
  useEffect(() => {
    if (!blogData?.author) return;
    (async () => {
      const authorData: IUser = await getSingleUser(
        blogData?.author!
      );

      setAuthorDetails(authorData);
    })();
    // cheack already liked
    const alreadyLiked = blogData?.likes.some(
      (id) => id.toString() === authUser?._id.toString()
    );
    setAlreadyLiked(alreadyLiked!);
  }, [blogData]);

  // like post
  const handleLike = async () => {
    disliked && setDisliked(false);

    const uri = `${
      import.meta.env.VITE_BASE_SERVER_URL
    }/blogs/${blogId}/like`;
    try {
      const response = await fetch(uri, {
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Couldn't like a post");
        toast.error("Failed to like, please try again.");
        return;
      }
      const jsonResponse = await response.json();
      if (
        jsonResponse?.message === "Blog post unliked successfully"
      ) {
        setAlreadyLiked(false);
      } else if (
        jsonResponse?.message === "Blog post liked successfully"
      ) {
        setAlreadyLiked(true);
      }
    } catch (error) {
      console.log("Couldn't like a post,error:", error);
      return;
    }
  };

  return (
    <div className="w-full md:my-11">
      <div className="w-full flex">
        {/* blog details */}
        <div className="blog-detail w-full md:w-3/4">
          <div className="image bg-amber-400 w-full h-auto">
            <img
              className="w-full h-[350px] md:h-[450px] lg:h-[600px] object-cover"
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
            <h1 className="text-2xl md:text-4xl font-bold py-3 my-4 [font-family:var(--font-roboto-condensed)] uppercase">
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
                <Heart
                  className={`inline ${
                    alreadyLiked ? "text-red-600" : ""
                  }`}
                />{" "}
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
            <button
              onClick={handleLike}
              className={`border-2 grow font-bold px-4 rounded flex items-center py-3 justify-center gap-3 cursor-pointer transition-all duration-100 ease-linear
            ${
              alreadyLiked
                ? "text-white border-blue-600 bg-blue-600 hover:bg-blue-700"
                : "text-blue-400 hover:text-blue-600 border-blue-400 hover:bg-blue-200"
            }`}>
              <ThumbsUp className="inline" />{" "}
              <span>{blogData?.likes.length}</span>
            </button>
            <button
              onClick={() => {
                setDisliked(true);
                alreadyLiked && handleLike();
              }}
              className={` grow  hover:bg-red-200 text-red-400 hover:text-red-600 border-2 border-red-600 font-bold  px-4 rounded flex items-center py-3 justify-center gap-3 cursor-pointer ${
                disliked
                  ? "bg-red-600 text-white hover:bg-red-500"
                  : " hover:bg-red-200 text-red-400 hover:text-red-600"
              }`}>
              <ThumbsDown />
            </button>
          </div>

          {/* comment-section */}

          <CommentsSection blogData={blogData!} />
        </div>

        {/* Recent blogs component */}
        <RecentBlogs />
      </div>
    </div>
  );
}
