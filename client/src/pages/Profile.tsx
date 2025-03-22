import { useId } from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router";

export default function Profile() {
  const keyId = useId();
  return (
    <div>
      <div className="min-h-screen w-full bg-gray-100 p-1 sm:p-3 md:p-6 lg:p-10">
        <div className="min-h-[70vh] w-full bg-white rounded-2xl">
          <div className="user-profile&details w-full h-40 sm:h-56 md:h-74 rounded-2xl bg-center bg-cover bg-[url(https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"></div>

          <div className="w-full flex flex-col sm:flex-row min-h-[30vh] justify-between">
            <div className="user-image">
              <div className="photo w-32 h-32 sm:w-48 sm:h-48 absolute sm:relative">
                <div className="absolute left-4 top-[-40%]">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS1o3mO3S_Nkfw1WAGaRJ6KaOGgODpfoOsA&s"
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex-grow p-6 pt-18 sm:pt-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                John Doe
              </h1>
              <div className="flex flex-wrap">
                <div className="user-detail sm:w-1/2">
                  <p className="font-semibold text-gray-800 mb-4">
                    Email:{" "}
                    <span className="text-gray-500">
                      john.doe@example.com
                    </span>
                  </p>
                  <p className="font-semibold text-gray-800 mb-4">
                    Phone:{" "}
                    <span className="text-gray-500">
                      +1 (555) 123-4567
                    </span>
                  </p>
                  <p className="text text-gray-800 mb-4 font-semibold">
                    Gender:{" "}
                    <span className="text-gray-500">Female</span>
                  </p>
                </div>
                <div className="w-full sm:w-1/2 sm:px-5">
                  <p className="font-semibold text-gray-800 mb-4">
                    Posts: <span className="text-gray-500">15</span>
                  </p>
                  <p className="font-semibold text-gray-800 mb-4">
                    Total likes:{" "}
                    <span className="text-gray-500">35</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                    isAdmin={true}
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
