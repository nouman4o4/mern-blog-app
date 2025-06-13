import React from "react";
import { NavLink } from "react-router";

interface CategItem {
  id: number;
  imgSrc: string;
  date: string;
  title: string;
}
const dummyData: CategItem[] = [
  {
    id: 1,
    imgSrc:
      "https://html.quomodosoft.com/binduz/assets/images/latest-post-1.jpg",
    date: "24th February 2020",
    title: "The Best Way to Learn Programming",
  },
  {
    id: 2,
    imgSrc:
      "https://html.quomodosoft.com/binduz/assets/images/latest-post-2.jpg",
    date: "15th March 2021",
    title: "Understanding Asynchronous JavaScript",
  },
  {
    id: 3,
    imgSrc:
      "https://html.quomodosoft.com/binduz/assets/images/latest-post-3.jpg",
    date: "7th December 2021",
    title: "10 Tips for React Developers",
  },
  {
    id: 4,
    imgSrc:
      "https://html.quomodosoft.com/binduz/assets/images/latest-post-4.jpg",
    date: "18th January 2022",
    title: "Getting Started with Node.js",
  },
  {
    id: 4,
    imgSrc:
      "https://html.quomodosoft.com/binduz/assets/images/latest-post-4.jpg",
    date: "18th January 2022",
    title: "Getting Started with Node.js",
  },
  {
    id: 4,
    imgSrc:
      "https://html.quomodosoft.com/binduz/assets/images/latest-post-4.jpg",
    date: "18th January 2022",
    title: "Getting Started with Node.js",
  },
];
export default function RecentBlogs() {
  return (
    <div className="grow">
      <div className="w-full hidden md:block max-w-2xs mx-auto h-full bg-gray-50 p-3 pl-4">
        <h5 className="px-2 font-semibold">Most Recent</h5>

        <div className="reccomendation-blogs-container py-5 gap-2">
          {dummyData.map((item, i) => (
            <div
              key={i}
              className="categ-item flex gap-3 items-center pb-5">
              <div className="photo size-18">
                <img
                  src={item.imgSrc}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="_content w-3/4 flex flex-col justify-center">
                <NavLink to={"/blog:30"}>
                  <div className="date text-sm text-gray-500">
                    {item.date}
                  </div>
                </NavLink>
                <div className="title font-semibold leading-tight">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
