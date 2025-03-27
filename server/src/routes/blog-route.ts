import { Request, Response, Router } from "express";
import {
  updateBlog,
  createBlog,
  getAllBlogs,
  getBlog,
  deleteBlog,
} from "../controllers/blog-controller";
import { authMiddleware } from "../middleswares/authMiddleware";
import { upload } from "../middleswares/multer";

const blogRouter = Router();

// GET all blog posts
blogRouter.get("/", getAllBlogs);

// GET a single blog post
blogRouter.get("/:id", getBlog);

// CREATE a blog post
blogRouter.post("/", upload.single("file"), createBlog);

// UPDATE a blog post
blogRouter.put("/:id", authMiddleware, updateBlog);

// DELETE a blog post
blogRouter.delete("/:id", authMiddleware, deleteBlog);

export default blogRouter;
