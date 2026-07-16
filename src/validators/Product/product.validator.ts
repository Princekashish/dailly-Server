import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const productValidator = z.object({
  categoryId: z
    .string()
    .regex(objectIdRegex, "Invalid category ID"),

  subcategoryId: z
    .string()
    .regex(objectIdRegex, "Invalid subcategory ID")
    .nullable(),

  subcategoryNodeId: z
    .string()
    .regex(objectIdRegex, "Invalid subcategory node ID"),

  brandId: z
    .string()
    .regex(objectIdRegex, "Invalid brand ID"),

  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(200, "Product name cannot exceed 200 characters"),

  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ).optional(),

  shortDescription: z
    .string()
    .trim()
    .max(300, "Short description cannot exceed 300 characters"),

  description: z
    .string()
    .trim()
    .max(5000, "Description cannot exceed 5000 characters")
    .optional(),

  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .default([]),

  thumbnail: z
    .string()
    .url("Thumbnail must be a valid URL")
    .optional(),

  tags: z
    .array(z.string().trim().min(1))
    .default([]),

  isFeatured: z
    .boolean()
    .default(false),

  isTrending: z
    .boolean()
    .default(false),

  isActive: z
    .boolean()
    .default(true),
});
