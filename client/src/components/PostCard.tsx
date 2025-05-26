import { useId } from "react";
import { NavLink } from "react-router";
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
      className="card grow basis-[300px] shadow-xl p-1 rounded-xl">
      <div className="w-full">
        <NavLink to={"/blog/12"}>
          <div className="photo w-full overflow-hidden rounded-xl">
            <img
              src={
                postData.featuredImage ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2eDKZ-dZvcBAmwEcTVoVxsekAWpM7bDzFQ&s"
              }
              alt="photo"
              className="w-full hover:scale-105 duration-200"
            />
          </div>
        </NavLink>

        <div className="content p-2">
          <NavLink to={"/blog/12"}>
            <h2 className="heading text-lg font-semibold  my-3">
              {postData.title}
            </h2>
            <p
              dangerouslySetInnerHTML={{ __html: postData.content }}
              className="desc text-sm leading-tight pb-2 text-gray-600"></p>
          </NavLink>
        </div>
        <div className="userDetails flex gap-2 p-2 justify-between items-center">
          <div>
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="size-8 rounded-full inline mr-2"
            />
            <p className="name text-[14px] font-semibold inline">
              {postData.author}
            </p>
          </div>
          <span className="date text-[13px] font-semibold">
            19 Jan 2025
          </span>
          {isAuthor ? (
            <button className="dlt px-3 py-1 bg-red-400 text-white rounded hover:shadow cursor-pointer hover:bg-red-500">
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
