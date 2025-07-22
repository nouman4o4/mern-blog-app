import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { IUser } from "../types/User";
import { IPost } from "../types/Post";
import toast from "react-hot-toast";
import { Delete, Edit, Trash } from "lucide-react";

interface PostDetails {
  postData: IPost;
  authorDetails?: IUser | undefined;
  isAuthor: boolean;
  authorId: string;
}

export default function PostCard({
  postData,
  // authorDetails,
  authorId,
  isAuthor,
}: PostDetails) {
  const newId = useId();
  const [authorDetails, setAuthorDetails] = useState<IUser>();
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState<boolean>(
    location.pathname === "/"
  );
  // Getting authorDetails
  useEffect(() => {
    (async () => {
      const url = `http://localhost:3000/api/v1/users/${authorId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.success) {
          toast.error(
            "Something went wrong while fetching the author data!"
          );
          return;
        }
        setAuthorDetails(jsonResponse.data);
      } catch (error) {
        console.log(error);
        toast.error("Opps! something went wrong");
      }
    })();
  }, []);

  return (
    <div
      key={newId}
      className="card w-full md:h-64  shadow-xl rounded">
      <div className="w-full h-full flex items-center flex-col md:flex-row md:flew-row gap-4">
        {/* image */}
        <div
          className={`photo w-full h-1/4 md:h-64 md:w-1/3 flex-shrink-0`}>
          <img
            src={
              postData.featuredImage ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2eDKZ-dZvcBAmwEcTVoVxsekAWpM7bDzFQ&s"
            }
            alt="photo"
            className="w-full h-full object-cover hover:scale-105 duration-200"
          />
        </div>

        <div className="h-full flex flex-col justify-between grow md:py-3">
          <div className="content p-2 py-3 mb-3 h-52 overflow-hidden">
            <NavLink to={`/blog/${postData._id}`}>
              <h2 className="heading text-xl font-semibold mb-3">
                {postData.title}
              </h2>
              <p
                dangerouslySetInnerHTML={{ __html: postData.content }}
                className="desc text-sm leading-tight pb-2 text-gray-600"></p>
            </NavLink>
          </div>
          <div
            className={`userDetails flex gap-2 p-2 justify-between ${
              isHomePage ? "flex-row" : "flex-col md:flex-row"
            } md:items-center `}>
            <div>
              <img
                src={`${
                  authorDetails?.profileImage
                    ? authorDetails?.profileImage
                    : authorDetails?.gender === "male"
                    ? "https://avatar.iran.liara.run/public/41"
                    : "https://avatar.iran.liara.run/public/88"
                } `}
                alt=""
                className="size-8 rounded-full inline mr-2"
              />
              {!isAuthor ? (
                <Link
                  className="name text-[14px] font-semibold inline"
                  to={`/profile/${postData.author}`}>
                  {authorDetails?.firstname} {authorDetails?.lastname}{" "}
                </Link>
              ) : (
                <p className="name text-[14px] font-semibold inline">
                  {authorDetails?.firstname} {authorDetails?.lastname}{" "}
                  (you)
                </p>
              )}
            </div>
            <div
              className={` ${
                !isHomePage ? "w-full md:w-1/2 " : ""
              }  flex justify-between mt-3 mx-3`}>
              <span className="date text-[13px] font-semibold">
                {new Date(postData.createdAt!).toLocaleDateString()}
              </span>
              {isAuthor && !isHomePage ? (
                <>
                  {" "}
                  <div className=" hidden md:block">
                    <Link to={`/update-blog/${postData._id}`}>
                      <button className="edit px-3 py-1 mx-3 bg-blue-400 text-white rounded hover:shadow cursor-pointer hover:bg-blue-500">
                        {" "}
                        Edit
                      </button>
                    </Link>
                    <button className="dlt px-3 py-1 bg-red-400 text-white rounded hover:shadow cursor-pointer hover:bg-red-500">
                      Delete
                    </button>
                  </div>
                  <div className="block md:hidden">
                    <button className="edit text-gray-500 mx-3 rounded hover:shadow cursor-pointer ">
                      <Edit />
                    </button>
                    <button className="dlt text-red-400 rounded hover:shadow cursor-pointer ">
                      <Trash />
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
