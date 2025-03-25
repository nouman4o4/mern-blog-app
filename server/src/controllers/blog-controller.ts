import { Request, Response } from "express";
import { uploadFileToCloudinary } from "../lib/cloundinary";
import { Post } from "../models/posts.model";

// Create blog post
export const createBlog = async (req: Request, res: Response) => {
  const { title, content, author, attachments, category } = req.body;
  if (!title || !content || !author || category) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Please provide all the required fields",
    });
    return;
  }
  const featuredImageFile = req.file;
  let featuredImageUrl: string | undefined = "";
  try {
    const imageUploadResult = await uploadFileToCloudinary(
      featuredImageFile?.path as string
    );
    featuredImageUrl = imageUploadResult?.secure_url;
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Image upload failed",
      error,
    });
  }

  try {
    const newPost = await Post.create({
      title,
      content,
      author,
      category,
      featuredImageUrl,
      attachments,
    });
    if (!newPost) {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Something went wrong while create a new blog post",
      });
      return;
    }

    res.status(201).json({
      success: true,
      status: 201,
      message: "New blog post created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Something went wrong while create a new blog post",
      error,
    });
  }
};
// Get all blog posts
export const getAllBlogs = async (req: Request, res: Response) => {
  res.json({ message: "Get all blog posts" });
};
// Get a blog post
export const getBlog = async (req: Request, res: Response) => {
  res.json({ message: "Get a blog post" });
};
// Update a blog post
export const updateBlog = async (req: Request, res: Response) => {
  res.json({ message: "Update a blog post" });
};
// Delete blog post
export const deleteBlog = async (req: Request, res: Response) => {
  res.json({ message: "Delete a blog" });
};
