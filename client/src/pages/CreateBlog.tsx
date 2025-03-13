import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}
const categories: Category[] = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Travel" },
  { id: "3", name: "Food" },
  { id: "4", name: "Lifestyle" },
  { id: "5", name: "Business" },
  { id: "6", name: "Health" },
];

export default function CreateBlog() {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] =
    useState<Boolean>(false);
  const [category, setCategory] = useState<string>("");
  return (
    <div className="min-h-screen w-full p-2 md:p-4 mx-2 md:px-8 bg-gray-100">
      <div className="h-full w-full bg-white p-4 md:p-2">
        <h1 className="text-3xl font-bold my-4">Create New Blog</h1>
        {/* form */}
        <div className="w-full ">
          <form
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
                name="title"
                id="title"
                placeholder="Enter a title for your blog"
                className="w-full my-2 p-3 text-lg rounded-lg outline-0 ring-1 ring-gray-300 focus:ring-blue-500"
              />
            </div>
            {/* category */}
            <div className="title-input my-2 select-none">
              <label
                htmlFor="title"
                className="font-semibold text-sm">
                Blog Category
              </label>
              <div
                className={`w-full flex justify-between items-center my-2 p-3 text-lg rounded-lg ring-1 cursor-pointer hover:bg-gray-50  ${
                  !isCategoryMenuOpen
                    ? "ring-gray-300"
                    : "ring-blue-400"
                }`}
                onClick={() => {
                  setIsCategoryMenuOpen((prev) => !prev);
                  console.log(isCategoryMenuOpen);
                }}>
                <button type="button" className="">
                  {category ? category : "Select a category"}
                </button>
                <ChevronDown className="text-gray-500" />
              </div>
              <div
                className={`overflow-hidden w-full pb-4 transition-all duration-500  ${
                  isCategoryMenuOpen ? " visible" : "invisible"
                } `}>
                {true ? (
                  <div
                    className={`cat-dropdown-menu w-full h-56 rounded-lg border-b-1 border-b-gray-200 transition-all duration-500 ${
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
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
