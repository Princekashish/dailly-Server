import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title too long")
    .trim(),

  description: z
    .string()
    .max(1000, "Description too long")
    .optional(),

  categoryId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID format"),

  price: z.coerce
    .number()
    .positive("Price must be greater than 0"),

  mrp: z.coerce
    .number()
    .positive("MRP must be greater than 0")
    .optional(),

  stock: z.coerce
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative")
    .default(0),

  // images: z
  //   .array(z.string().url("Invalid image URL"))
  //   .default([]),

  isActive: z.preprocess((val) => {
    if (typeof val === "string") {
      if (val.toLowerCase() === "true") return true;
      if (val.toLowerCase() === "false") return false;
    }
    return val;
  }, z.boolean().default(true))
});