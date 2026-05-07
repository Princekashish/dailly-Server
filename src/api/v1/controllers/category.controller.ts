import { Request, Response, NextFunction } from "express";
import { Category } from "../../../models/category.model";

export const categoryController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, isActive } = req.body;

            const existing = await Category.findOne({ name: name.toLowerCase().trim() });
            if (existing) {
                return res.status(400).json({ success: false, message: "Category already exists" });
            }

            const category = await Category.create({
                name: name.toLowerCase().trim(),
                isActive: isActive !== undefined ? isActive : true
            });

            res.status(201).json({ success: true, data: category });
        } catch (err) {
            next(err);
        }
    },

    // Get all categories, optionally filter by isActive
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query: any = {};
            if (req.query.isActive !== undefined) {
                query.isActive = req.query.isActive === "true";
            }

            const categories = await Category.find(query).sort({ name: 1 });
            res.status(200).json({ success: true, data: categories });
        } catch (err) {
            next(err);
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ success: false, message: "Category not found" });
            }
            res.status(200).json({ success: true, data: category });
        } catch (err) {
            next(err);
        }
    }
};