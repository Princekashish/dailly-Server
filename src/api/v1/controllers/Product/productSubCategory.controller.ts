import { NextFunction, Request, Response } from "express";
import { ProductSubCategory } from "../../../../models/Product/subCategory.model";


export const ProductCategoriesController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { categoryId, name, image, isActive, slug, sortOrder } = req.body;
            const existing = await ProductSubCategory.findOne({ categoryId, name: name.toLowerCase().trim() });
            if (existing) {
                return res.status(400).json({ success: false, message: "Categories already exists" });
            }
            const category = await ProductSubCategory.create({
                categoryId,
                name: name.toLowerCase().trim(),
                image,
                isActive: isActive !== undefined ? isActive : true,
                slug: slug.toLowerCase().trim(),

                sortOrder: sortOrder !== undefined ? sortOrder : 0,

            });
            return res.status(201).json({ success: true, data: category });
        } catch (err) {
            next(err);
        }
    },
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { categoryId } = req.params
            const categories = await ProductSubCategory
                .find({categoryId: categoryId })
                .sort({ createdAt: 1 });

            if (categories.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Categories not found",
                });
            }

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
            const { categoryId } = req.params;
            const { name, image, isActive, slug, sortOrder } = req.body;
            const existing = await ProductSubCategory.findById(categoryId)
            if (!existing) {
                return res.status(404).json({ success: false, message: "categories not found" })
            }
            const updateData = {
                name: name.toLowerCase().trim(),

                image,
                isActive: isActive !== undefined ? isActive : true,
                slug: slug.toLowerCase().trim(),


                sortOrder: sortOrder !== undefined ? sortOrder : 0,
            }



            const update = await ProductSubCategory.findByIdAndUpdate(categoryId, {
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
            const { categoryId } = req.params
            const category = await ProductSubCategory.findByIdAndDelete(categoryId)
            if (!category) {
                return res.status(404).json({ success: false, message: "category not found" })
            }
            return res.status(200).json({ success: true, message: "categories deleted" });

        } catch (error) {
            next(error)

        }
    }
}