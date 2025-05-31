import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { dummyData } from "../utils/dummydata";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper as SwiperClass } from "swiper";
import PostCard from "../components/PostCard";
import Categories from "../components/Category-section";
import { IPost } from "../types/Post";
import toast from "react-hot-toast";
import useUserStore from "../store/userStore";

const Home: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [blogPosts, setBlogPosts] = useState<IPost[]>();
  const { authUser } = useUserStore();

  useEffect(() => {
    (async () => {
      const url = "http://localhost:3000/api/v1/blogs";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const jsonResponse = await response.json();
      console.log({ jsonResponse });
      if (!jsonResponse.success) {
        toast.error(
          "Something went wrong while getting blog posts data"
        );
        return;
      }
      setBlogPosts(jsonResponse.posts);
    })();
  }, []);

  return (
    <div>
      <div
        className="w-full h-[70vh] md:h-[90vh] p-1 md:p-6 relative flex overflow-hidden rounded-xl md:rounded-3xl
    ">
        {/* Next arrow button */}

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={50}
          speed={2500}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay]}>
          {dummyData.map((item) => (
            <SwiperSlide key={item.id}>
              <NavLink
                to={"/blog/12"}
                key={item.id}
                className="w-full shrink-0 h-[65vh] md:h-[80vh] flex items-end bg-cover bg-center relative rounded-lg md:rounded-2xl overflow-hidden"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                }} // Replace with your actual image URL
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black-10"></div>

                {/* Content Container */}
                <div className="w-full lg:w-[70%] z-10 p-7 px-3 lg:p-10">
                  <NavLink to={""} className="content grow-2">
                    <h3 className="text-white font-bold lg:text-lg ">
                      Featured
                    </h3>
                    <div className="title mb-3 lg:mb-4">
                      <div className="text-2xl lg:text-4xl  font-semibold text-white">
                        {" "}
                        {item.title} <br />
                        Advice from Unitiled Founder, Frankie
                      </div>
                    </div>
                    <div className="desc">
                      <p className="text-gray-200 lg:text-lg leading-tight text-wrap overflow-hidden ">
                        {item.description}
                      </p>
                    </div>
                  </NavLink>
                </div>

                {/* <div className="absolute bottom-10 right-10 bg-white size-8">
          hi
        </div> */}
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Categories />
      {/* all blogs */}
      <div className="w-[90%] mx-auto py-6">
        <h3 className="text-xl font-bold my-1 text-black">
          Recent Blog posts
        </h3>
        <div className="blog-container pt-6 flex items-center justify-center gap-8 flex-wrap">
          {blogPosts?.map((post) => (
            <PostCard
              authorId={post.author}
              postData={post}
              isAuthor={authUser?._id === post.author}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
