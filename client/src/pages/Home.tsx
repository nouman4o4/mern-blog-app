import { ArrowBigRight, ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import { NavLink } from "react-router";
import { dummyData } from "../utils/dummydata";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper as SwiperClass } from "swiper";

const Home: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  return (
    <div>
      <div
        className="w-full h-[90vh] p-3 md:p-6 relative flex overflow-x-hidden
    ">
        {/* Next arrow button */}
        <div
          onClick={() => swiperRef?.current?.slideNext()}
          className="navigater absolute top-[40%] lg:top-[50%] z-20 right-15 cursor-pointer bg-white/40 rounded-full hover:bg-white/40 duration-200 hover:scale-110">
          <ArrowRight className="text-black hover:text- size-12 lg:size-20" />
        </div>
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
                className="w-full shrink-0 h-[80vh] md:h-full flex items-end bg-cover bg-center relative rounded-xl md:rounded-3xl overflow-hidden"
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
      {/* all blogs */}
      <div className="w-[90%] mx-auto py-6">
        <h3 className="text-xl font-bold my-1 text-black">
          Recent Blog posts
        </h3>
        <div className="blog-container pt-6 flex items-center justify-center gap-5 flex-wrap">
          {Array.from({ length: 6 }).map(() => (
            <div className="card grow basis-[300px] shadow-xl p-1 rounded-xl">
              <div className="w-full">
                <div className="photo w-full overflow-hidden rounded-xl">
                  <img
                    src="https://images.unsplash.com/photo-1587620962725-abab7fe55159"
                    alt="photo"
                    className="w-full hover:scale-105 duration-200"
                  />
                </div>

                <div className="content p-2">
                  <h2 className="heading text-lg font-semibold  my-3">
                    Migrating to linear 101
                  </h2>
                  <p className="desc text-sm leading-tight pb-2 text-gray-600">
                    Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Debitis, deserunt?
                  </p>
                </div>
                <div className="userDetails flex gap-2 p-2  items-center">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    className="size-8 rounded-full"
                  />
                  <p className="name text-[12px] font-semibold">
                    Jonathan WIlls{" "}
                    <span className="date">19 Jan 2025</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
