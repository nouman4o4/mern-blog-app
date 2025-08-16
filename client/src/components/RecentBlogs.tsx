import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { IPost } from "../types/Post";

export default function RecentBlogs({
  pageBlogId,
}: {
  pageBlogId: string;
}) {
  const [recentBlog, setRecentBlogs] = useState<IPost[]>([]);
  const pathName = useLocation();

  useEffect(() => {
    // ask is this approach is the right!!
    (async () => {
      try {
        const url = `${
          import.meta.env.VITE_BASE_SERVER_URL
        }/blogs/recent/${pageBlogId}`;

        const response = await fetch(url);
        const jsonResponse = await response.json();
        if (!jsonResponse) {
          return;
        }
        setRecentBlogs(jsonResponse.blogs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [pathName]);

  return (
    <div className="grow">
      <div className="w-full hidden md:block max-w-2xs mx-auto h-full bg-gray-50 p-3 pl-4">
        <h5 className="px-2 font-semibold">Most Recent</h5>

        <div className="reccomendation-blogs-container py-5 gap-2">
          {recentBlog?.map((item, i) => (
            <Link
              to={`/blog/${item._id}`}
              key={i}
              className="categ-item flex gap-3 items-center pb-5">
              <div className="photo size-18">
                <img
                  src={item.featuredImage?.secureUrl}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="_content w-3/4 flex flex-col justify-center">
                <div>
                  <div className="date text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="title font-semibold leading-tight">
                  {item.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// add logic for to exclude the blog on the page
