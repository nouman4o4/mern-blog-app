import { useId } from "react";
import { Link, NavLink } from "react-router";
import { IUser } from "../types/User";
import { IPost } from "../types/Post";

interface PostDetails {
  postData: IPost;
  authorDetails?: IUser | undefined;
  isAuthor: boolean;
}

export default function PostCard({
  postData,
  authorDetails,
  isAuthor,
}: PostDetails) {
  const newId = useId();
  return (
    <div
      key={newId}
      className="card w-full md:h-64  shadow-xl rounded">
      <div className="w-full h-full flex items-center gap-4">
        {/* image */}
        <div className={`photo h-64 w-1/3 flex-shrink-0 `}>
          <img
            src={
              postData.featuredImage ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2eDKZ-dZvcBAmwEcTVoVxsekAWpM7bDzFQ&s"
            }
            alt="photo"
            className="w-full h-full object-cover hover:scale-105 duration-200"
          />
        </div>

        <div className="h-full flex flex-col justify-between grow bg-red200 py-3">
          <div className="content p-2 py-3 mb-3 overflow-hidden">
            <NavLink to={`/blog/${postData._id}`}>
              <h2 className="heading text-xl font-semibold mb-3">
                {postData.title}
              </h2>
              <p
                dangerouslySetInnerHTML={{ __html: postData.content }}
                className="desc text-sm leading-tight pb-2 text-gray-600 "></p>
            </NavLink>
          </div>
          <div className="userDetails flex gap-2 p-2 justify-between items-center">
            <div>
              <img
                src={`${authorDetails?.profileImage}`}
                alt=""
                className="size-8 rounded-full inline mr-2"
              />
              {!isAuthor ? (
                <Link
                  className="name text-[14px] font-semibold inline"
                  to={`/profile/${postData.author}`}>
                  {authorDetails?.firstname} {authorDetails?.lastname}
                </Link>
              ) : (
                <p className="name text-[14px] font-semibold inline">
                  {authorDetails?.firstname} {authorDetails?.lastname}
                </p>
              )}
            </div>
            <span className="date text-[13px] font-semibold">
              {new Date(postData.createdAt!).toLocaleDateString()}
            </span>
            {isAuthor ? (
              <div>
                <button className="edit px-3 py-1 mx-3 bg-blue-400 text-white rounded hover:shadow cursor-pointer hover:bg-blue-500">
                  Edit
                </button>
                <button className="dlt px-3 py-1 bg-red-400 text-white rounded hover:shadow cursor-pointer hover:bg-red-500">
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
