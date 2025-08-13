import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function HeroSliderSkeleton() {
  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      spaceBetween={50}
      speed={2500}
      loop={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      modules={[Autoplay]}>
      {Array.from({ length: 3 }).map((_, i) => (
        <SwiperSlide key={i}>
          <div className="w-full shrink-0 h-[65vh] md:h-[80vh] flex items-end relative rounded-lg md:rounded-2xl overflow-hidden bg-gray-300 animate-pulse">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10"></div>

            {/* Content Skeleton */}
            <div className="w-full lg:w-[70%] z-10 p-7 px-3 lg:p-10">
              <div className="space-y-3">
                {/* Source Name */}
                <div className="h-4 w-24 bg-gray-400 rounded"></div>

                {/* Title */}
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-gray-400 rounded"></div>
                  <div className="h-6 w-1/2 bg-gray-400 rounded"></div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-400 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-400 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
