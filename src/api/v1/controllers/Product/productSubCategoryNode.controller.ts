import { NextFunction, Request, Response } from "express";
import { ProductSubCategoryNode } from "../../../../models/Product/subCategoryNode.model";


export const ProductSubCategoryNodeController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { categoryId, subcategoryId, name, description, image, isActive, slug, banner, sortOrder, isFeatured } = req.body;
            const existing = await ProductSubCategoryNode.findOne({ name: name.toLowerCase().trim() });
            if (existing) {
                return res.status(400).json({ success: false, message: "Category already exists" });
            }
            const category = await ProductSubCategoryNode.create({
                categoryId,
                subcategoryId,
                name: name.toLowerCase().trim(),
                description,
                image,
                banner,
                isFeatured: isFeatured !== undefined ? isFeatured : false,
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
            const { categoryId, subcategoryId } = req.params;

            const categories = await ProductSubCategoryNode
                .find({
                    categoryId,
                    subcategoryId,
                })
                .sort({ createdAt: 1 });

            // if (categories.length === 0) {
            //     return res.status(404).json({
            //         success: false,
            //         message: "No subcategories found",
            //     });
            // }

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
            const { subcategoryId } = req.params;
            const { name, description, image, isActive, slug, banner, sortOrder, isFeatured } = req.body;
            const existing = await ProductSubCategoryNode.findById(subcategoryId)
            if (!existing) {
                return res.status(404).json({ success: false, message: "category not found" })
            }

            const updateData = {
                name: name.toLowerCase().trim(),
                description,
                image,
                isActive: isActive !== undefined ? isActive : true,
                slug: slug.toLowerCase().trim(),
                banner,
                isFeatured: isFeatured !== undefined ? isFeatured : false,
                sortOrder: sortOrder !== undefined ? sortOrder : 0,
            }



            const update = await ProductSubCategoryNode.findByIdAndUpdate(subcategoryId, {
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
            const { subcategoryId } = req.params
            const category = await ProductSubCategoryNode.findByIdAndDelete(subcategoryId)
            if (!category) {
                return res.status(404).json({ success: false, message: "category not found" })
            }
            // await ProductSubCategories.deleteMany({
            //     categoryId: id
            // });
            return res.status(200).json({ success: true, message: "category deleted" });

        } catch (error) {
            next(error)

        }
    }
}