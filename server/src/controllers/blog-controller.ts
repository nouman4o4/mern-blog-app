import { Request, Response } from "express";

// Create blog post
export const createBlog = async (req: Request, res: Response) => {
  res.json({ message: "Create a blog" });
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
