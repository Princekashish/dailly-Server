import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const productSubCategoryNodeValidator = z.object({
  categoryId: z
    .string()
    .regex(objectIdRegex, "Invalid category ID"),

  subcategoryId: z
    .string()
    .regex(objectIdRegex, "Invalid categories ID")
    .nullable()
    .optional(),

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

  banner: z
    .string()
    .url("Banner must be a valid URL")
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  sortOrder: z
    .number()
    .int("Sort order must be an integer")
    .nonnegative("Sort order cannot be negative")
    .default(0),

  isFeatured: z
    .boolean()
    .default(false),

  isActive: z
    .boolean()
    .default(true),
});
