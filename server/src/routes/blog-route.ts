import { Request, Response, Router } from "express";
import {
  updateBlog,
  createBlog,
  getAllBlogs,
  getBlog,
  deleteBlog,
  getAllBlogsForUser,
  likeBlog,
  createComment,
  getCommentsForBlog,
  likeComment,
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

// Like a post
blogRouter.patch("/:id/like", authMiddleware, likeBlog);

// Get all blog posts fo a user
blogRouter.get("/user/:userid", getAllBlogsForUser);

// Create a comment
blogRouter.post("/:id/comments", authMiddleware, createComment);

// get all comments for a blog post
blogRouter.get("/:id/comments", authMiddleware, getCommentsForBlog);

// like a comment
blogRouter.patch(
  "/:id/comments/:commentId/like",
  authMiddleware,
  likeComment
);

export default blogRouter;
