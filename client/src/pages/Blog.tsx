import { Calendar } from "lucide-react";

export default function Blog() {
  return (
    <div className="w-full my-11">
      <div className="w-full flex">
        {/* blog details */}
        <div className="blog-detail w-3/4">
          <div className="image bg-amber-400 w-full h-auto">
            <img
              className="w-full h-auto"
              src="https://html.quomodosoft.com/binduz/assets/images/author-item-1.jpg"
              alt=""
            />
          </div>
          {/* Blog content */}
          <div className="Blog-content p-8">
            <div className="flex gap-4 items-center">
              <div className="category p-2 bg-red-400 text-white">
                TECHNOLOGY
              </div>
              <div className="date text-[12px] text-gray-500">
                <Calendar className="inline size-[16px] mb-1" />{" "}
                <span className="">24th Febuary 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Author Details */}
        <div className="bg-gray-200 grow">Author Details</div>
      </div>
    </div>
  );
}
