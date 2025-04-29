import { z } from "zod";

export const userUpadteSchema = z.object({
  firstname: z
    .string({ required_error: "Firsname should not be empty!" })
    .trim()
    .min(4, "Firstname must be 4 characters!")
    .max(8, "Firsname must not be more than 8 characters!"),
  lastname: z
    .string({ required_error: "Lastname is should not be empty!" })
    .trim()
    .min(4, "Lastname must be 4 characters!")
    .max(8, "Lasname must not be more than 8 characters!"),
});
