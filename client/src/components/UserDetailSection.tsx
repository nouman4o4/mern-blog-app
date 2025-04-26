import React, { useEffect, useState } from "react";
import useImageCropper from "../hooks/useImageCropper";
import useUserStore from "../store/userStore";
import { Camera, Divide, Loader } from "lucide-react";
import CropModal from "./CropModal";
import { IUser } from "../types/User";

export default function UserDetailSection({
  authorDetails,
  isAuthor,
  likes,
}: {
  likes: string[];
  authorDetails: IUser | undefined;
  isAuthor: boolean;
}) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [croppedUrl, setCroppedUrl] = useState<string>("");
  const { isCropped, setIsCropped } = useImageCropper(
    croppedUrl,
    setCroppedUrl
  );
  const { authUser, setAuthUser } = useUserStore();

  useEffect(() => {
    if (imageSrc) {
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    } else if (!imageSrc) {
      document.body.style.height = "auto";
      document.body.style.overflowY = "auto";
    }
  }, [isCropped, imageSrc]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageSrc(reader.result);
        setIsCropped(false); // Reset if cropping again
        setCroppedUrl("");
      }
    };
    reader.readAsDataURL(file);
  };

  const getProfileImage = () => {
    if (isUploading) return croppedUrl;
    if (authUser?.profileImage) return authUser?.profileImage;
    return authUser?.gender === "male"
      ? "https://avatar.iran.liara.run/public/41"
      : "https://avatar.iran.liara.run/public/88";
  };
  useEffect(
    () => console.log({ croppedUrl }),
    [croppedUrl, isCropped]
  );
  return (
    <>
      <CropModal
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        setIsUploading={setIsUploading}
        croppedUrl={croppedUrl}
        setCroppedUrl={setCroppedUrl}
      />

      <div className="min-h-[70vh] w-full bg-white rounded-2xl">
        <div className="user-profile&details w-full h-40 sm:h-56 md:h-74 rounded-2xl bg-center bg-cover bg-[url(https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"></div>

        <div className="w-full flex flex-col sm:flex-row min-h-[30vh] justify-between">
          <div className="user-image">
            <div className="photo w-32 h-32 sm:w-48 sm:h-48 absolute sm:relative">
              <div className="absolute bg-white left-4 top-[-40%] border-2 border-black rounded-full">
                <img
                  src={getProfileImage()}
                  alt=""
                  className={`w-full h-full object-cover rounded-full ${
                    isUploading ? "opacity-60" : ""
                  }`}
                />
                {isUploading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-white">
                    <Loader />
                  </div>
                )}
                <div className="absolute right-2 bottom-2 bg-red-500 rounded-full p-2 text-lg text-white">
                  <label htmlFor="profile-image">
                    <Camera className=" " />
                    <input
                      id="profile-image"
                      name="profile-image"
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      hidden
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow p-6 pt-18 sm:pt-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-3 capitalize">
              {authorDetails?.firstname +
                " " +
                authorDetails?.lastname}
            </h1>
            <div className="flex flex-wrap">
              <div className="user-detail sm:w-1/2">
                <p className="font-semibold text-gray-800 mb-4">
                  Email:{" "}
                  <span className="text-gray-500">
                    {authorDetails?.email}
                  </span>
                </p>

                <p className="text text-gray-800 mb-4 font-semibold">
                  Gender:{" "}
                  <span className="text-gray-500 capitalize">
                    {authorDetails?.gender}
                  </span>
                </p>
              </div>
              <div className="w-full sm:w-1/2 sm:px-5">
                <p className="font-semibold text-gray-800 mb-4">
                  Posts:{" "}
                  <span className="text-gray-500">
                    {authorDetails?.posts?.length}
                  </span>
                </p>
                <p className="font-semibold text-gray-800 mb-4">
                  Total likes:{" "}
                  <span className="text-gray-500">
                    {likes.length}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
