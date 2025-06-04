import PostCard from "../components/PostCard";
import { Link, useNavigate, useParams } from "react-router";
import "react-image-crop/dist/ReactCrop.css";
import UserDetailSection from "../components/UserDetailSection";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IPost } from "../types/Post";

import { Edit2 } from "lucide-react";
import getSingleUser from "../utils/getUser";
import { IUser } from "../types/User";

export default function Profile() {
  const [authorDetails, setAuthorDetails] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const { authUser } = useUserStore();
  const params = useParams();
  const authorId = params.id;
  const navigate = useNavigate();
  // fetch posts and author's data
  useEffect(() => {
    (async () => {
      const url = `http://localhost:3000/api/v1/blogs/user/${authorId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (!jsonResponse.success) {
          toast.error(
            "Something went wrong while fetching blogs data!"
          );
          return;
        }
        setPosts(jsonResponse.data);
      } catch (error) {
        console.log(error);
        toast.error("Opps! something went wrong");
      }
    })();

    // get author data ;
    (async () => {
      const userData: IUser = await getSingleUser(authorId!);
      setAuthorDetails(userData);
    })();
    (async () => {
      const url = `http://localhost:3000/api/v1/users/${authorId}/total-likes`;
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.success) {
          return;
        }
        setLikes(jsonResponse.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params.id]);

  return (
    <div>
      <div className="min-h-screen w-full bg-gray-100 p-1 sm:p-3 md:p-6 lg:p-10">
        <UserDetailSection
          likes={likes}
          authorDetails={authorDetails}
          isAuthor={authorId === authUser?._id}
        />

        {/* blogs */}
        <div className="text-center my-3 py-3">
          {authorId === authUser?._id && (
            <Link
              to={"/create-blog"}
              className="text-sm md:text-xl font-semibold bg-white text-black py-2 px-4 rounded-lg cursor-pointer shadow-lg">
              Create a new post{" "}
              <span>
                <Edit2 className="inline size-4 md:size-6 ml-2" />
              </span>
            </Link>
          )}
        </div>
        <div className="w-full my-4">
          {/* <h1 className="py-3 my-3 text-3xl font-semibold">
            My Posts
          </h1> */}
          <div className="posts-container">
            {/* post */}
            <div className="w-full bg-white rounded-lg py-5 p-2">
              <div className="blog-container pt-6 flex items-center justify-center gap-8 flex-wrap">
                {posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-10 rounded-lg">
                    <img
                      src="https://illustrations.popsy.co/gray/work-from-home.svg"
                      alt="No posts"
                      className="w-48 h-48 mb-4 opacity-80"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                      No Blogs Yet
                    </h2>
                    <p className="text-gray-500 mb-4">
                      Looks like you haven't created any blogs. Start
                      writing your first one!
                    </p>
                    <button
                      onClick={() => navigate("/create-blog")}
                      className="px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded-md transition-all">
                      Create Blog
                    </button>
                  </div>
                ) : (
                  posts?.map((post, index) => (
                    <PostCard
                      key={index}
                      postData={post}
                      authorId={post.author}
                      isAuthor={authorId === authUser?._id}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
