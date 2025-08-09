import { Check, ChevronDown, Loader2, Upload, X } from "lucide-react";
import React, {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import Editor from "../components/Editor";
import { blogSchema } from "../schemas/blogSchema";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";
import { IPost } from "../types/Post";
import { useNavigate } from "react-router";

interface Category {
  id: string;
  name: string;
}

interface IFormData {
  title: string;
  content: string;
  category: string;
  image: File | null;
}

const categories: Category[] = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Travel" },
  { id: "3", name: "Food" },
  { id: "4", name: "Lifestyle" },
  { id: "5", name: "Business" },
  { id: "6", name: "Health" },
];

export default function BlogForm({
  updatePage,
  updateBlogId,
}: {
  updateBlogId: string;
  updatePage: boolean;
}) {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] =
    useState<Boolean>(false);
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [updateBlogData, setUpdateBlogData] = useState<IPost>();
  const [category, setCategory] = useState<string>("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const authUser =
    JSON.parse(localStorage.getItem("blog-app-user")!) ||
    useUserStore((state) => state.authUser);
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submitFunction = async (_: IFormData, formData: FormData) => {
    const title = formData.get("title") as string | null;

    const zodResult = blogSchema.safeParse({
      title,
      content,
      category,
    });
    const validationError = zodResult.error?.format();

    if (!zodResult.success) {
      toast("Please provide all the required data correctly", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      setTitleError(validationError?.title?._errors[0] ?? "");

      return {
        title: title ?? "",
        content: content ?? "",
        category: category ?? "",
        image: image ?? null,
        error: validationError,
      };
    }

    formData.append("content", content!);
    formData.append("category", category!);
    !updatePage && formData.append("author", authUser._id!);
    formData.append("file", image!);

    // Api call
    try {
      if (!updatePage) {
        const url = "http://localhost:3000/api/v1/blogs/";
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const jsonResponse = await response.json();
        if (!jsonResponse.success) {
          navigate(-1);
          toast.error(jsonResponse.message);
        } else {
          navigate(-1);
          toast.success("Post created successfully!");
          // Redirect to the post page
        }
      } else if (updatePage) {
        const url = `http://localhost:3000/api/v1/blogs/${updateBlogId}`;
        const response = await fetch(url, {
          method: "PUT",
          credentials: "include",
          body: formData,
        });

        if (!response.ok) {
          console.log(response);
          toast.error("Oops something went wrong while updating..");
          navigate(-1);
          return {
            title: title ?? "",
            content: content ?? "",
            category: category ?? "",
            image: image ?? null,
            error: null,
          };
        }

        const jsonResponse = await response.json();
        console.log("JsonResponse of update: ", jsonResponse);
        console.log(jsonResponse);
        if (!jsonResponse.success) {
          toast.error(jsonResponse.message);
          navigate(-1);
        } else {
          toast.success("Blog updated successfully!");
          navigate(-1);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops! an unexpected error occured");
    }
    return {
      title: title ?? "",
      content: content ?? "",
      category: category ?? "",
      image: image ?? null,
      error: null,
    };
  };

  const [state, formAction, isPending] = useActionState(
    submitFunction,
    {
      title: "",
      content: "",
      category: "",
      image: null,
      error: null,
    }
  );

  // get data for the blog to update,
  if (updatePage && updateBlogId) {
    useEffect(() => {
      (async () => {
        try {
          const url = `${
            import.meta.env.VITE_BASE_SERVER_URL
          }/blogs/${updateBlogId}`;
          const response = await fetch(url, {
            method: "GET",
            credentials: "include",
          });
          if (!response.ok) {
            console.log("something went wrong!");
          }
          const jsonResonse = await response.json();
          if (!jsonResonse.success) {
            console.log(jsonResonse.message);
          }
          console.log("blog data for update!", jsonResonse);
          setUpdateBlogData(jsonResonse.post);
          setCategory(jsonResonse.post.category!);
          setContent(jsonResonse.post.content);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [updateBlogId]);
  }

  return (
    <div className="min-h-screen w-full p-2 md:p-4 md:px-8">
      <div className="h-full w-full bg-white md:p-4">
        <h1 className="text-2xl md:text-3xl font-bold my-2 md:my-4">
          {updatePage ? "Update the Blog" : "Create New Blog"}
        </h1>
        {/* form */}
        <div className="w-full ">
          <form
            action={formAction}
            className="w-full min-h-screen py-2 md:py-4
          ">
            {/* title input */}
            <div className="title-input mb-4">
              <label
                htmlFor="title"
                className="font-semibold text-sm">
                Blog Title
              </label>
              <input
                type="text"
                defaultValue={
                  updatePage
                    ? updateBlogData?.title
                    : (state.title as string)
                }
                name="title"
                id="title"
                onChange={() =>
                  titleError.length > 0 && setTitleError("")
                }
                placeholder="Enter a title for your blog"
                className="w-full my-2 p-2 md:p-3 text-lg rounded-lg outline-0 ring-1 ring-gray-300 focus:ring-blue-500"
              />
              <p className="text-red-400 text-sm h-5">{titleError}</p>
            </div>
            {/* category */}
            <div className="title-input my-2 select-none relative">
              <label
                htmlFor="title"
                className="font-semibold text-sm">
                Blog Category
              </label>
              <div
                className={`w-full flex justify-between items-center my-2 p-2 md:p-3 text-lg rounded-lg ring-1 cursor-pointer hover:bg-gray-50  ${
                  !isCategoryMenuOpen
                    ? "ring-gray-300"
                    : "ring-blue-400"
                }`}
                onClick={() => {
                  setIsCategoryMenuOpen((prev) => !prev);
                }}>
                <button type="button" className="">
                  {category ? category : "Select a category"}
                </button>
                <ChevronDown className="text-gray-500" />
              </div>
              <div
                className={`overflow-hidden absolute w-full z-20 pb-4 transition-all  duration-500  ${
                  isCategoryMenuOpen ? "visible" : "invisible"
                } `}>
                <div
                  className={`cat-dropdown-menu w-full z-20 relative bg-white h-56 rounded-lg border-b-1 border-b-gray-200 transition-all duration-300 ${
                    !isCategoryMenuOpen
                      ? "-translate-y-[15rem] "
                      : "translate-y-0 shadow-lg "
                  }`}>
                  {categories.map((cat, i) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.name);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer ${
                        i < categories.length - 1
                          ? "border-b-1 border-b-gray-100"
                          : ""
                      }`}>
                      {cat.name}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-red-400 text-sm h-5">
                {(!category && state.error?.category?._errors[0]) ??
                  ""}
              </p>
            </div>

            {/* Featured image */}
            <div className="w-full min-h-40 rounded-lg border-dashed border-2 border-gray-300 mt-12">
              {imagePreview ? (
                <div className="w-full relative h-64 flex items-center justify-center py-4 p-2">
                  <img
                    src={imagePreview}
                    alt=""
                    className="h-full rounded-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <X
                      onClick={() => {
                        setImagePreview("");
                        setImage(undefined);
                      }}
                      className="size-8 bg-red-500 rounded-full text-white cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`w-full ${
                    updatePage && updateBlogData?.featuredImage
                      ? "h-auto"
                      : "h-32"
                  } my-3 flex items-center justify-center`}>
                  <div className="text-center flex flex-col items-center">
                    <label
                      htmlFor="image-file"
                      className="flex flex-col items-center cursor-pointer">
                      {
                        <>
                          {updatePage &&
                          updateBlogData &&
                          updateBlogData.featuredImage?.secureUrl &&
                          !image ? (
                            <div className="w-full relative h-64 flex items-center justify-center py-4 p-2">
                              <img
                                src={
                                  updateBlogData.featuredImage
                                    .secureUrl
                                }
                                alt=""
                                className="h-full rounded-lg"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="size-12 text-gray-400" />
                              <span>Choose a photo</span>
                            </>
                          )}

                          <input
                            type="file"
                            name="image-file"
                            id="image-file"
                            accept="image/*,.png,.jpg,.gif"
                            className="sr-only"
                            ref={inputRef}
                            onChange={handleImageChange}
                          />
                        </>
                      }
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* content Editer */}
            <div className="min-h-54 w-full mt-8 border-1 border-gray-200 rounded-lg">
              {updatePage ? (
                content ? (
                  <Editor content={content} onChange={setContent} />
                ) : (
                  "Loading..."
                )
              ) : (
                <Editor content={content} onChange={setContent} />
              )}
            </div>
            <p className="text-red-400 text-sm h-5">
              {(content.length >= 10 &&
                state.error?.content?._errors[0]) ??
                ""}
            </p>
            <div className="flex justify-start py-4">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Check className="-ml-1 mr-2 h-5 w-5" />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
