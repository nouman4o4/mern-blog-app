import { z } from "zod";
export const signUpSchema = z
  .object({
    firstname: z
      .string({ required_error: "Firstname is required" })
      .min(4, "Firstname should be at least 4 characters")
      .max(8, "Firstname should not be more than 8 characters")
      .trim(),
    lastname: z
      .string({ required_error: "Lastname is required" })
      .min(4, "Lastname should be at least 4 characters")
      .max(8, "Lastname should not be more than 8 characters")
      .trim(),
    email: z
      .string({ required_error: "Email is required" })
      .email("Email is required!")
      .trim(),
    password: z
      .string({ required_error: "Password is required!" })
      .min(8, "Password is too short!")
      .max(12, "Password too long!"),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
    gender: z.string({ required_error: "Please select your gender" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
