import React from "react";
import useImageCropper from "../hooks/useImageCropper";
import { X } from "lucide-react";
import { uploadProfileImage } from "../utils/uploadImage";
import toast from "react-hot-toast";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router";
import ReactCrop from "react-image-crop";
type PropsTypes = {
  imageSrc: string;
  croppedUrl: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setCroppedUrl: React.Dispatch<React.SetStateAction<string>>;
};
export default function CropModal({
  imageSrc,
  setImageSrc,
  setIsUploading,
  croppedUrl,
  setCroppedUrl,
}: PropsTypes) {
  const { authUser: user, setAuthUser } = useUserStore();
  const navigate = useNavigate();
  const {
    crop,
    setCrop,
    setCompletedCrop,
    isCropped,
    setIsCropped,
    imgRef,
    imageFile,
    setImageFile,
    getCroppedImage,
  } = useImageCropper(croppedUrl, setCroppedUrl);

  const setImageAndUpload = async () => {
    toast("Image is uploading...");
    if (!imageFile) {
      toast.error("Image file not found");
      return;
    }
    try {
      setIsUploading(true);
      setImageSrc("");

      const jsonResponse = await uploadProfileImage(
        user?._id as string,
        imageFile
      );

      if (!jsonResponse.success) {
        console.log(jsonResponse);

        if (jsonResponse.message === "User not found") {
          localStorage.removeItem("blog-app-user");
          setAuthUser(null);
          toast.error("Something went wrong, Please login again.");

          setIsCropped(false);
          setImageSrc("");
          setCroppedUrl("");
          setImageFile(null);
          navigate("/login");
          return;
        }
        toast.error(
          jsonResponse.message ||
            "Something went wrong, Please login again."
        );

        return;
      }
      const userData = jsonResponse.data;
      setAuthUser({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        gender: userData.gender,
        profileImage: userData.profileImage,
        _id: userData._id,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong while uploading profile image."
      );
    } finally {
      setIsUploading(false);
      setIsCropped(false);
      setImageSrc("");
      setCroppedUrl("");
      setImageFile(null);
    }
  };

  const onImageLoaded = (img: HTMLImageElement) => {
    imgRef.current = img;
  };

  if (!imageSrc) return;
  return (
    <div className="profile-image-preview fixed inset-0 z-20 h-screen w-screen bg-black/75 flex items-center justify-center p-2">
      <div className="bg-white rounded-lg w-full md:w-8/12 h-fit max-h-3/4 p-5 flex items-center flex-col relative xlg:pt-4 pt-14">
        <div
          onClick={() => {
            setImageSrc("");
            setCroppedUrl("");
            setImageFile("");
          }}
          className="absolute top-2 right-2 text-xl cursor-pointer text-red-500 border-1 border-black bg-white rounded-full p-[1px]">
          <X className="size-4 md:size-6" />
        </div>

        {isCropped ? (
          <div className="h-full flex justify-center flex-col gap-10">
            <div className={`image w-44 h-44 sm:w-64 sm:h-64 `}>
              <img
                onClick={() => {
                  setImageFile("");
                  setCroppedUrl("");
                  setIsCropped(false);
                }}
                src={croppedUrl}
                alt=""
                className="w-full h-full cursor-pointer object-cover rounded-full border-black border-2 "
              />
            </div>
            <div className="btns text-center">
              <button
                onClick={() => {
                  setImageFile("");
                  setCroppedUrl("");
                  setIsCropped(false);
                }}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black shadow rounded">
                Edit
              </button>
              <button
                onClick={setImageAndUpload}
                className="mt-4 mx-2 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded">
                Set And Upload
              </button>
            </div>
          </div>
        ) : (
          <>
            <ReactCrop
              className="h-fit max-h-[400px] md:max-h-[500px] mx-auto w-fit max-w-9/10 overflow-hidden"
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1 / 1}>
              <img
                src={imageSrc}
                ref={imgRef}
                onLoad={(e) => onImageLoaded(e.currentTarget)}
                alt="To Crop"
                className="w-full h-full object-contain"
              />
            </ReactCrop>
            <button
              onClick={getCroppedImage}
              className="mt-4 px-4 py-2 bg-gray-900 hover:scale-105 text-white rounded">
              Crop Image
            </button>
          </>
        )}
      </div>
    </div>
  );
}
