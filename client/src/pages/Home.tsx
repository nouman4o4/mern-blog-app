import React, { useRef } from "react";
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

const Home: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  return (
    <div>
      <div
        className="w-full h-[70vh] md:h-[90vh] p-1 md:p-6 relative flex overflow-hidden rounded-xl md:rounded-3xl
    ">
        {/* Next arrow button */}
        {/* <div
          onClick={() => swiperRef?.current?.slideNext()}
          className="navigater absolute top-[40%] lg:top-[50%] z-20 right-15 cursor-pointer bg-white/40 rounded-full hover:bg-white/40 duration-200 hover:scale-110">
          <ArrowRight className="text-black hover:text- size-12 lg:size-20" />
        </div> */}
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
        <div className="blog-container pt-6 flex items-center justify-center gap-5 flex-wrap">
          {Array.from({ length: 6 }).map(() => (
            <PostCard
              userProfile="hello"
              id={"post._id"}
              title={"post.title"}
              desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Debitis, deserunt?"
              image={"post.image"}
              username={"post.username"}
              date={new Date()}
              isAdmin={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
