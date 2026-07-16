import { z } from "zod";

export const laundryItemValidator = z.object({
    category: z
        .string()
        .min(1, "Category is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid category id"),

    name: z
        .string()
        .min(2, "Item name must be at least 2 characters")
        .max(100, "Item name must be at most 100 characters")
        .trim(),

    price: z.object({
        normal: z.coerce.number().min(0),
        dryClean: z.coerce.number().min(0),
        iron: z.coerce.number().min(0).optional(),
        washIron: z.coerce.number().min(0).optional(),
    }),
    description: z
        .string()
        .max(1000)
        .trim()
        .optional(),


    image: z
        .string()
        .url("Image must be a valid URL")
        .optional()
        .or(z.literal("")),

    isActive: z
        .boolean()
        .default(true),
});