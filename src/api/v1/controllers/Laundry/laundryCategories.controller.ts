import { NextFunction, Request, Response } from "express";
import { LaundryCategories } from "../../../../models/Laundry/laundryCategories.model";
import { success } from "zod";
import { AlignHorizontalJustifyStartIcon } from "lucide-react";
export const laundaryCategoriesController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, image, isActive } = req.body;
            const existing = await LaundryCategories.findOne({ name: name.toLowerCase().trim() });
            if (existing) {
                return res.status(400).json({ success: false, message: "Category already exists" });
            }
            const category = await LaundryCategories.create({
                name: name.toLowerCase().trim(),
                description,
                image,
                isActive: isActive !== undefined ? isActive : true
            });
            return res.status(201).json({ success: true, data: category });
        } catch (err) {
            next(err);
        }
    },
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await LaundryCategories
                .find({ isActive: true })
                .sort({ createdAt: 1 });

            return res.status(200).json({
                success: true,
                data: categories,
            });

        } catch (error) {
            next(error);
        }
    },
    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, description, image, isActive } = req.body;
            const existing = await LaundryCategories.findById(id)
            if (!existing) {
                return res.status(404).json({ success: false, message: "category not found" })
            }
            const update = await LaundryCategories.findByIdAndUpdate(id, {
                name,
                description,
                image,
                isActive
            })

            return res.status(200).json({ success: true, data: update });
        } catch (error) {
            next(error)
        }
    },
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const category = await LaundryCategories.findByIdAndDelete(id)
            if (!category) {
                return res.status(404).json({ success: false, message: "category not found" })
            }
            return res.status(200).json({ success: true, message: "category deleted" });

        } catch (error) {
            next(error)

        }
    }
}