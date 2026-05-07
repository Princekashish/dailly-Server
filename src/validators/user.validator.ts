import { z } from "zod";

export const signupUserSchema = z
  .object({
    email: z.string().min(1, "please enter valid email").email("Invalid email"),
    password: z.string().length(6),
  })
export const updating_profile = z.object({
  user: z.string(),
  image: z.string().optional(),
  phone: z.string().optional(),
});
