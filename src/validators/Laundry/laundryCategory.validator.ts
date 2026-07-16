import { z } from "zod";

export const laundryCategoriesValidator = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be at most 50 characters")
    .trim(),

  description: z
    .string()
    .max(1000)
    .trim()
    .optional(),

  image: z
    .string()
    .optional(),

  isActive: z
    .boolean()
    .optional()
});
