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

export default function HeroSlider() {
  const swiperRef = useRef<SwiperClass | null>(null);
  return (
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
  );
}
