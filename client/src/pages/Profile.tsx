import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router";
import { Camera, File } from "lucide-react";
import useUserStore from "../store/userStore";
import { useFileReader } from "../utils/utilities";
import ReactCrop, { PixelCrop, type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageCropper from "../components/ImageCropper";
import toast from "react-hot-toast";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export default function Profile() {
  // const [_, seUser] = useState<User>();
  const [isProfileImagePreview, setIsProfileImagePreview] =
    useState<boolean>(false);
  const [imageFile, setImageFile] = useState<any | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>("");

  const { authUser, setAuthUser } = useUserStore();
  const [imageSrc, setImageSrc] = useState<string>("");

  const [completedCrop, setCompletedCrop] =
    useState<PixelCrop | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string>("");
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    aspect: 1,
  });

  const user =
    authUser ||
    JSON.parse(localStorage.getItem("blog-app-user") as string);

  // const handleImageChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   console.log({ file });
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImagePreview(reader.result as string);
  //   };
  //   reader.readAsDataURL(file);
  // };

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
  const onImageLoaded = (img: HTMLImageElement) => {
    imgRef.current = img;
  };
  const getCroppedImage = useCallback(() => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY =
      imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      console.log(blob);
      const previewUrl = URL.createObjectURL(blob);
      setImageFile(blob);
      setCroppedUrl(previewUrl);
      setIsCropped(true); // Hide cropper and show result
    }, "image/jpeg");
  }, [completedCrop]);

  const setImageAndUpload = async () => {
    console.log("Hello!, file is uploading...");
    toast.loading("File is uploading");
    if (!imageFile) {
      toast.error("Image file not found");
      return;
    }
    try {
      setImagePreview(croppedUrl);
      console.log({ user });
      const url = `http://localhost:3000/api/v1/users/update-profile/${user?._id}`;
      const formData = new FormData();
      formData.append(
        "profile",
        imageFile,
        `${user?.firstname}_profile.jpg`
      );
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });
      const jsonReponse = await response.json();
      console.log(jsonReponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen w-full bg-gray-100 p-1 sm:p-3 md:p-6 lg:p-10">
        {imageSrc && (
          <div className="profile-image-preview absolute inset-0 z-20 h-screen w-screen bg-black/75 flex items-center justify-center">
            <div className="bg-white  rounded-lg w-8/12 h-3/4 p-5 flex items-center flex-col">
              {isCropped ? (
                <div>
                  <div className="image w-32 h-32 sm:w-56 sm:h-56">
                    <img
                      src={croppedUrl}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="btns">
                    <button className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">
                      Edit
                    </button>
                    <button
                      onClick={setImageAndUpload}
                      className="mt-4 mx-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                      Set And Upload
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={1}
                    keepSelection>
                    <img
                      src={imageSrc}
                      ref={imgRef}
                      onLoad={(e) => onImageLoaded(e.currentTarget)}
                      alt="To Crop"
                      className="max-w-full max-h-[400px]"
                    />
                  </ReactCrop>
                  <button
                    onClick={getCroppedImage}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                    Crop Image
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="min-h-[70vh] w-full bg-white rounded-2xl">
          <div className="user-profile&details w-full h-40 sm:h-56 md:h-74 rounded-2xl bg-center bg-cover bg-[url(https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"></div>

          <div className="w-full flex flex-col sm:flex-row min-h-[30vh] justify-between">
            <div className="user-image">
              <div className="photo w-32 h-32 sm:w-48 sm:h-48 absolute sm:relative">
                <div className="absolute left-4 top-[-40%] border-2 border-black rounded-full">
                  <img
                    src={`${
                      imagePreview ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS1o3mO3S_Nkfw1WAGaRJ6KaOGgODpfoOsA&s"
                    }`}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
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
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                {user
                  ? user?.firstname + " " + user?.lastname
                  : "loading..."}
              </h1>
              <div className="flex flex-wrap">
                <div className="user-detail sm:w-1/2">
                  <p className="font-semibold text-gray-800 mb-4">
                    Email:{" "}
                    <span className="text-gray-500">
                      {user ? user.email : "loading..."}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-800 mb-4">
                    Phone:{" "}
                    <span className="text-gray-500">
                      +1 (555) 123-4567
                    </span>
                  </p>
                  <p className="text text-gray-800 mb-4 font-semibold">
                    Gender:{" "}
                    <span className="text-gray-500">Female</span>
                  </p>
                </div>
                <div className="w-full sm:w-1/2 sm:px-5">
                  <p className="font-semibold text-gray-800 mb-4">
                    Posts: <span className="text-gray-500">15</span>
                  </p>
                  <p className="font-semibold text-gray-800 mb-4">
                    Total likes:{" "}
                    <span className="text-gray-500">35</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full min-h-screen bg-gray-300">
          <ImageCropper />
        </div>
        {/* blogs */}
        <div className="text-end my-3 py-3">
          <Link
            to={"/create-blog"}
            className="text-xl font-semibold border bg-black text-white py-2 px-4 rounded-lg cursor-pointer">
            Create a new post
          </Link>
        </div>
        <div className="w-full my-4">
          <h1 className="py-3 my-3 text-3xl font-semibold">
            My Posts
          </h1>
          <div className="posts-container">
            {/* post */}
            <div className="w-full bg-white rounded-3xl py-5 p-2">
              <div className="blog-container pt-6 flex items-center justify-center gap-5 flex-wrap">
                {Array.from({ length: 6 }).map((_, index) => (
                  <PostCard
                    key={index}
                    userProfile="hello"
                    id={Date.now().toString()} // Ensure unique ID
                    title="Migrating to linear 101"
                    desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, deserunt?"
                    image={"post.image"} // Make sure this is replaced with a valid image source
                    username="Jonathan Wills"
                    date={new Date()}
                    isAdmin={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
