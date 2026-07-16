import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const attributeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Attribute name is required"),

  value: z
    .string()
    .trim()
    .min(1, "Attribute value is required"),

  unit: z
    .string()
    .trim()
    .optional(),
});

export const productvariantValidator = z.object({
  productId: z
    .string()
    .regex(objectIdRegex, "Invalid product ID"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required").optional(),

  barcode: z
    .string()
    .trim()
    .optional(),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters")
    .optional(),

  attributes: z
    .array(attributeSchema)
    .default([]),

  mrp: z
    .number()
    .positive("MRP must be greater than 0"),

  sellingPrice: z
    .number()
    .positive("Selling price must be greater than 0"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative")
    .default(0),

  lowStockAlert: z
    .number()
    .int("Low stock alert must be an integer")
    .nonnegative("Low stock alert cannot be negative")
    .default(0),

  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .default([]),

  isDefault: z
    .boolean()
    .default(false),

  isActive: z
    .boolean()
    .default(true),
}).refine(
  (data) => data.sellingPrice <= data.mrp,
  {
    message: "Selling price cannot be greater than MRP",
    path: ["sellingPrice"],
  }
);

