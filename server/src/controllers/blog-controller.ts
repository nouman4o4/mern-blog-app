import { Request, Response } from "express";
import { uploadFileToCloudinary } from "../lib/cloundinary";
import { Post } from "../models/posts.model";
import { createBlogShcema } from "../schemas/blog-schema";
import fs from "fs";

// Create blog post
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, author, category } = req.body;

    const zodResult = createBlogShcema.safeParse({
      title,
      content,
      author,
      category,
    });

    if (!zodResult.success) {
      res.status(400).json({
        success: false,
        status: 400,
        message:
          "Please provide all the required fields: title, content, author, and category.",
        error: zodResult.error.errors,
      });
      return;
    }

    const featuredImageFile = req.file;
    let featuredImageUrl: string | undefined;

    if (featuredImageFile) {
      try {
        const imageUploadResult = await uploadFileToCloudinary(
          featuredImageFile.path
        );
        featuredImageUrl = imageUploadResult?.secure_url;
        fs.unlink(featuredImageFile.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          status: 500,
          message: "Image upload failed",
          error,
        });
        return;
      }
    }

    const newPost = await Post.create({
      title,
      content,
      author,
      category,
      featuredImage: featuredImageUrl,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "New blog post created successfully!",
      post: newPost,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Something went wrong while creating a new blog post",
      error: error.message || error,
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
