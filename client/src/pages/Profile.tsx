import PostCard from "../components/PostCard";
import { Link, useParams } from "react-router";
import "react-image-crop/dist/ReactCrop.css";
import UserDetailSection from "../components/UserDetailSection";
import useUserStore from "../store/userStore";

export default function Profile() {
  const { authUser } = useUserStore();
  const params = useParams();
  const profileUserId = params.id;

  return (
    <div>
      <div className="min-h-screen w-full bg-gray-100 p-1 sm:p-3 md:p-6 lg:p-10">
        <UserDetailSection profileUserId={profileUserId} />

        {/* blogs */}
        <div className="text-end my-3 py-3">
          <Link
            to={"/create-blog"}
            className="text-xl font-semibold border bg-black text-white py-2 px-4 rounded-lg cursor-pointer">
            Create a new post
          </Link>
        </div>
        <div className="w-full my-4">
          <h1 className="py-3 my-3 text-3xl font-semibold">
            My Posts
          </h1>
          <div className="posts-container">
            {/* post */}
            <div className="w-full bg-white rounded-3xl py-5 p-2">
              <div className="blog-container pt-6 flex items-center justify-center gap-5 flex-wrap">
                {Array.from({ length: 6 }).map((_, index) => (
                  <PostCard
                    key={index}
                    userProfile="hello"
                    id={Date.now().toString()} // Ensure unique ID
                    title="Migrating to linear 101"
                    desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, deserunt?"
                    image={"post.image"} // Make sure this is replaced with a valid image source
                    username="Jonathan Wills"
                    date={new Date()}
                    isOwner={profileUserId === authUser?._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
