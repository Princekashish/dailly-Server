import { z } from "zod";

export const productCategoryValidator = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    )
    .optional(),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional(),

  icon: z
    .string()
    .trim()
    .optional(),

  color: z
    .string()
    .trim()
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

// export type ProductCategoryInput = z.infer<typeof productCategorySchema>;