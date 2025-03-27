import { z } from "zod";

export const createBlogShcema = z.object({
  title: z.string().min(3, "Title must be at least 3 charaters long"),
  content: z
    .string()
    .min(10, "Content must be at least 10 Characters"),
  author: z.string({ required_error: "Author is required" }),
  category: z.string({ required_error: "Category is required" }),
});
