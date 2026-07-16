import { z } from "zod";

export const productSubCategoryValidator = z.object({
  categoryId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),

  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),

  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    )
    .optional(),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional(),

  sortOrder: z
    .number()
    .int("Sort order must be an integer")
    .nonnegative("Sort order cannot be negative")
    .default(0),

  isActive: z
    .boolean()
    .default(true),
});

