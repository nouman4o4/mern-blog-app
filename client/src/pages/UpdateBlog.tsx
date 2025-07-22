import React from "react";
import BlogForm from "../components/BlogForm";

export default function UpdateBlog() {
  return (
    <div>
      Update Blog
      <BlogForm updatePage={true} />
    </div>
  );
}
