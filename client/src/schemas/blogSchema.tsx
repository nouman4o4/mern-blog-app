import z from "zod";

export const blogSchema = z.object({
  title: z
    .string({ required_error: "Please type a title" })
    .min(5, "Title should be at least 5 characters"),
  content: z
    .string()
    .min(10, "content should be at least 10 character")
    .max(200, "content should not be more than 200 chracter"),
  category: z
    .string({ required_error: "category is required" })
    .min(3, "Category is required!"),
});
