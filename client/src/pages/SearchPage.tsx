import React from "react";
import useGlobalStore from "../store/globalStore";
import PostCard from "../components/PostCard";
import { useParams, useSearchParams } from "react-router";
import { Search } from "lucide-react";

export default function SearchPage() {
  const { searchedBlogs } = useGlobalStore();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  return (
    <div>
      <div className="w-full my-4">
        <div className="posts-container">
          {/* post */}
          <div className="w-full bg-white rounded-lg py-5 p-2">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h3>
              </div>

              {searchedBlogs.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-medium">
                    {searchedBlogs.length} posts found
                  </div>
                </div>
              )}
            </div>
            <div className="blog-container pt-6 flex items-center justify-center gap-8 flex-wrap">
              {/* Results Content */}
              {searchedBlogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
                      <Search className="w-16 h-16 text-red-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xl">?</span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    No Results Found
                  </h2>
                  <p className="text-gray-600 text-lg mb-6 max-w-md">
                    We couldn't find any posts matching your search
                    for{" "}
                    <span className="font-semibold text-red-600">
                      "{searchQuery}"
                    </span>
                  </p>

                  <div className="space-y-3 text-gray-500 text-sm">
                    <p>Try adjusting your search:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Check your spelling</li>
                      <li>Use different keywords</li>
                      <li>Try more general terms</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="grid gap-8">
                  {searchedBlogs.map((post) => (
                    <div
                      key={post._id}
                      className="transform transition-all duration-300 hover:scale-[1.02]">
                      <PostCard
                        postData={post}
                        authorId={post.author}
                        isAuthor={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
