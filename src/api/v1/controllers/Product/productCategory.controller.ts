import { NextFunction, Request, Response } from "express";
import { Category } from "../../../../models/Product/category.mode";


export const ProductCategoryController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, image, isActive, slug, icon, color, sortOrder } = req.body;
            const existing = await Category.findOne({ name: name.toLowerCase().trim() });
            if (existing) {
                return res.status(400).json({ success: false, message: "Category already exists" });
            }
            const category = await Category.create({
                name: name.toLowerCase().trim(),
                description,
                image,
                isActive: isActive !== undefined ? isActive : true,
                slug: slug.toLowerCase().trim(),
                icon,
                color,
                sortOrder: sortOrder !== undefined ? sortOrder : 0,

            });
            return res.status(201).json({ success: true, data: category });
        } catch (err) {
            next(err);
        }
    },
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await Category
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
            const { name, description, image, isActive, slug, icon, color, sortOrder } = req.body;
            const existing = await Category.findById(id)
            if (!existing) {
                return res.status(404).json({ success: false, message: "category not found" })
            }
            const updateData = {
                name: name.toLowerCase().trim(),
                description,
                image,
                isActive: isActive !== undefined ? isActive : true,
                slug: slug.toLowerCase().trim(),
                icon,
                color,
                sortOrder: sortOrder !== undefined ? sortOrder : 0,
            }



            const update = await Category.findByIdAndUpdate(id, {
                $set: updateData
            }, { returnDocument: "after", runValidators: true })

            if (!update) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }



            return res.status(200).json({ success: true, data: update });
        } catch (error) {
            next(error)
        }
    },
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const category = await Category.findByIdAndDelete(id)
            if (!category) {
                return res.status(404).json({ success: false, message: "category not found" })
            }
            // await ProductCategories.deleteMany({
            //     categoryId: id
            // });
            return res.status(200).json({ success: true, message: "category deleted" });

        } catch (error) {
            next(error)

        }
    }
}