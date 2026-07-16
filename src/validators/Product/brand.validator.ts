import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const productBrandValidator = z.object({
  subcategoryId: z
    .string()
    .regex(objectIdRegex, "Invalid subcategory ID"),

  name: z
    .string()
    .trim()
    .min(1, "Brand name is required")
    .max(100, "Brand name cannot exceed 100 characters"),

  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    )
    .optional(),

  logo: z
    .string()
    .url("Logo must be a valid URL")
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  isActive: z
    .boolean()
    .default(true),
});

