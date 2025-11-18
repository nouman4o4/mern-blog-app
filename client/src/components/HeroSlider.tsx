import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Swiper as SwiperClass } from "swiper"
import HeroSliderSkeleton from "./HeroSliderSkeleton"

interface sliderBlog {
  author: string
  content: string
  publishedAt: Date
  title: string
  url: string
  urlToImage: string
  description: string
  source: {
    name: string
  }
}

export default function HeroSlider() {
  const swiperRef = useRef<SwiperClass | null>(null)
  const [blogs, setBlogs] = useState<sliderBlog[]>([])

  const getCategoryForBlogs = function () {
    const categories = [
      "Technology",
      "Travel",
      "Food",
      "LifeStyle",
      "Business",
      "Health",
    ]
    const randomNumber = Math.ceil(Math.random() * categories.length - 1)

    return categories[randomNumber]
  }

  useEffect(() => {
    ;(async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_SERVER_URL
        const url = `${baseUrl}/blogs/news/${getCategoryForBlogs()}`

        const response = await fetch(url, {
          method: "GET",
        })
        if (!response.ok) {
          console.log("couldn't get latest news blogs")
          return
        }

        const jsonResponse = await response.json()

        if (!jsonResponse) {
          return
        }
        console.log(jsonResponse)
        setBlogs(jsonResponse.articles)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div
      className="w-full h-[70vh] md:h-[90vh] p-1 md:p-6 relative flex overflow-hidden rounded-xl md:rounded-3xl
        "
    >
      {/* Next arrow button */}
      {blogs && blogs.length > 0 ? (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={50}
          speed={2500}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {blogs.map((item, i) => (
            <SwiperSlide key={i}>
              <NavLink
                target="_blank"
                to={item.url}
                key={i}
                className="w-full shrink-0 h-[65vh] md:h-[80vh] flex items-end bg-cover bg-center relative rounded-lg md:rounded-2xl overflow-hidden"
                style={{
                  backgroundImage: `url(${item.urlToImage})`,
                }} // Replace with your actual image URL
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black-10"></div>

                {/* Content Container */}
                <div className="w-full lg:w-[70%] z-10 p-7 px-3 lg:p-10">
                  <div className="content grow-2">
                    <h3 className="text-white font-bold lg:text-lg ">
                      {item.source.name}
                    </h3>
                    <div className="title mb-3 lg:mb-4">
                      <div className="text-2xl lg:text-4xl font-semibold text-white">
                        {" "}
                        {item.title} <br />
                      </div>
                    </div>
                    <div className="desc">
                      <p className="text-gray-200 lg:text-lg leading-tight text-wrap overflow-hidden ">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div className="absolute bottom-10 right-10 bg-white size-8">
              hi
            </div> */}
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <HeroSliderSkeleton />
      )}
    </div>
  )
}
