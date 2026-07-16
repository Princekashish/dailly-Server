import { NextFunction, Request, Response } from "express";
import { ProductBrand } from "../../../../models/Product/brands.model";

export const ProductBrandController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { subcategoryId, name, logo, description, isActive, slug } = req.body
            const existingBrand = await ProductBrand.findOne({
                subcategoryId,
                name,
                isActive,
                slug
            })
            if (existingBrand) {
                res.status(400).json({
                    success: false,
                    message: "Brand already exists",
                    data: existingBrand
                })
            }

            const newBrand = await ProductBrand.create({
                subcategoryId,
                name,
                logo,
                description,
                isActive,
                slug
            })

            res.status(200).json({
                success: true,
                message: "Brand created successfully",
                data: newBrand
            })


        } catch (error) {
            next(error)

        }

    },
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {

            const brands = await ProductBrand.find({
                isActive: true
            }).sort({ createdAt: 1 });


            return res.status(200).json({
                success: true,
                data: brands,
            });

        } catch (error) {
            next(error);
        }

    },
    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params
            const brand = await ProductBrand.findByIdAndDelete(id)
            if(!brand){
                return res.status(404).json({
                    success: false,
                    message: "Brand not found",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Brand deleted successfully",
            })
        } catch (error) {
            next(error)
        }
    },
    async update(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params
            const {subcategoryId, name, logo, description, isActive, slug} = req.body
            const brand = await ProductBrand.findById(id)
            if(!brand){
                return res.status(404).json({
                    success: false,
                    message: "Brand not found",
                })
            }
            const updateData = {
                subcategoryId,
                name,
                logo,
                description,
                isActive,
                slug
            }
            const updatedBrand = await ProductBrand.findByIdAndUpdate(id, updateData, { new: true })
            return res.status(200).json({
                success: true,
                message: "Brand updated successfully",
                data: updatedBrand
            })
        } catch (error) {
            next(error)
        }
    }

}