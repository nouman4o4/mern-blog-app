import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is required!")
    .trim(),
  password: z
    .string({ required_error: "Password is required!" })
    .min(8, "Password must be 8 characters!")
    .max(12, "Password must not be more than 12 characters!"),
});
