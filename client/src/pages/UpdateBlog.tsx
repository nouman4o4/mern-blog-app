import { useParams } from "react-router";
import BlogForm from "../components/BlogForm";

export default function UpdateBlog() {
  const params = useParams();
  const blogId = params.id;
  return (
    <div>
      <BlogForm updatePage={true} updateBlogId={blogId!} />
    </div>
  );
}
