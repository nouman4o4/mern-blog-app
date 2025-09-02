import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { IUser } from "../types/User";
import { IPost } from "../types/Post";
import { Edit, Trash, Calendar, User, Eye } from "lucide-react";
import AlerDialog from "./AlerDialog";
import noImage from "/noImage.png";

interface PostDetails {
  postData: IPost;
  authorDetails?: IUser | undefined;
  isAuthor: boolean;
  authorId: string;
  setRefreshQuery?: () => void;
}

export default function PostCard({
  postData,
  authorId,
  isAuthor,
  setRefreshQuery,
}: PostDetails) {
  const [authorDetails, setAuthorDetails] = useState<IUser>();
  const location = useLocation();
  const [isHomePage] = useState<boolean>(location.pathname === "/");
  const [isAlert, setIsAlert] = useState(false);

  // Getting authorDetails
  useEffect(() => {
    (async () => {
      const url = `${
        import.meta.env.VITE_BASE_SERVER_URL
      }/users/${authorId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.success) {
          console.log(
            "Something went wrong while fetching the author data!"
          );
          return;
        }
        setAuthorDetails(jsonResponse.data);
      } catch (error) {
        console.log(error);
        console.log("Opps! something went wrong");
      }
    })();
  }, []);

  // Function to strip HTML tags and get plain text
  const getPlainText = (html: any, maxLength: number = 150) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <div className="group w-full bg-white rounded md:rounded-3xl border border-gray-100 shadow-lg shadow-gray-900/5 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Section */}
          <div className="relative w-full lg:w-80 h-64 lg:h-auto flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={
                (postData?.featuredImage?.secureUrl &&
                  postData.featuredImage.secureUrl) ||
                noImage
              }
              alt={postData.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 z-20">
              <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                <Calendar className="w-3 h-3 inline mr-1" />
                {new Date(postData.createdAt!).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between p-8 lg:p-10">
            <div className="flex-1">
              <NavLink
                to={`/blog/${postData._id}`}
                className="block group/link">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover/link:text-red-600 transition-colors duration-300">
                  {postData.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
                  {getPlainText(postData.content, 200)}
                </p>
              </NavLink>

              <div className="flex items-center gap-2 mb-6">
                <div className="h-px bg-gradient-to-r from-red-600 to-transparent w-12"></div>
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
              </div>
            </div>

            {/* Author and Action Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      authorDetails?.profileImage?.secureUrl ||
                      (authorDetails?.gender === "male"
                        ? "https://avatar.iran.liara.run/public/41"
                        : "https://avatar.iran.liara.run/public/88")
                    }
                    alt={`${authorDetails?.firstname} ${authorDetails?.lastname}`}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 shadow-md"
                  />
                </div>

                <div>
                  {!isAuthor ? (
                    <Link
                      className="text-gray-900 font-semibold hover:text-red-600 transition-colors duration-300"
                      to={`/profile/${postData.author}`}>
                      {authorDetails?.firstname}{" "}
                      {authorDetails?.lastname}
                    </Link>
                  ) : (
                    <p className="text-gray-900 font-semibold">
                      {authorDetails?.firstname}{" "}
                      {authorDetails?.lastname}
                      <span className="text-red-600 text-sm ml-2">
                        (You)
                      </span>
                    </p>
                  )}
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    Author
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isAuthor && !isHomePage ? (
                  <>
                    <Link to={`/update-blog/${postData._id}`}>
                      <button className="group/btn flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                        <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    </Link>
                    <button
                      onClick={() => setIsAlert(true)}
                      className="group/btn flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                      <Trash className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </>
                ) : (
                  <NavLink to={`/blog/${postData._id}`}>
                    <button className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5">
                      <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Read More
                    </button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Dialog */}
      {isAlert && (
        <AlerDialog
          setIsAlert={setIsAlert}
          blogId={postData._id}
          setRefreshQuery={setRefreshQuery!}
        />
      )}
    </>
  );
}
