import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PostCard from "../components/PostCard";
import Categories from "../components/Category-section";
import { IPost } from "../types/Post";
import useUserStore from "../store/userStore";
import HeroSlider from "../components/HeroSlider";

const Home: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<IPost[]>();
  const [category, setCategory] = useState<string | null>("");
  const { authUser } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const url = `${import.meta.env.VITE_BASE_SERVER_URL}/blogs${
        category ? `?category=${category}` : ""
      }`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Failed to fetch all blogs", response);
        return;
      }
      const jsonResponse = await response.json();

      if (!jsonResponse.success) {
        console.log(
          "Something went wrong while getting blog posts data"
        );
        return;
      }
      setBlogPosts(jsonResponse.posts);
    })();
  }, [category]);

  // setting seletected category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    setCategory(category);
  }, [location]);

  return (
    <div>
      <HeroSlider />

      <Categories />
      {/* all blogs */}
      <div className="w-[90%] mx-auto py-6">
        <h3 className="text-xl font-bold my-1 text-black capitalize">
          {category ?? "recent"} Blogs
        </h3>
        <div className="blog-container pt-6 flex items-center justify-center gap-8 flex-wrap">
          {blogPosts?.length! > 0 ? (
            blogPosts?.map((post, i) => (
              <PostCard
                key={i}
                authorId={post.author}
                postData={post}
                isAuthor={authUser?._id === post.author}
                setRefreshQuery={() => null}
              />
            ))
          ) : (
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
                Looks like there's no any blogs. Start writing your
                own one!
              </p>
              <button
                onClick={() => navigate("/create-blog")}
                className="px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded-md transition-all">
                Create Blog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
