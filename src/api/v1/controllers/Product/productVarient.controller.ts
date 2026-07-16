import { NextFunction, Request, Response } from "express";
import slugify from "slugify";
import { Product } from "../../../../models/Product/products.model";
import { ProductVariant } from "../../../../models/Product/productVariant.model";
import cloudinary from "../../../../utils/cloudinary";

export const productVariantController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {

            const product = await Product.findById(req.body.productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            const slug = slugify(`${product.slug}-${req.body.title}`, {
                lower: true,
                strict: true,
                trim: true
            });

            const existing = await ProductVariant.findOne({ slug });

            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Variant already exists"
                });
            }

            const files = (req.files as Express.Multer.File[]) || [];

            let imageUrls: string[] = [];

            if (files.length > 0) {

                imageUrls = await Promise.all(
                    files.map(file =>
                        new Promise<string>((resolve, reject) => {

                            const stream = cloudinary.uploader.upload_stream(
                                {
                                    folder: "product-variants"
                                },
                                (error, result) => {

                                    if (error) return reject(error);

                                    resolve(result?.secure_url || "");

                                }
                            );

                            stream.end(file.buffer);

                        })
                    )
                );

            } else if (req.body.images && Array.isArray(req.body.images)) {
                imageUrls = req.body.images;
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Please upload at least one image or provide image URLs."
                });
            };

            const variant = await ProductVariant.create({
                ...req.body,
                slug,
                images: imageUrls
            });

            return res.status(201).json({
                success: true,
                data: variant
            });

        } catch (error) {
            next(error);
        }
    },

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const variants = await ProductVariant.find({
                isActive: true
            }).populate("productId");

            return res.status(200).json({
                success: true,
                count: variants.length,
                data: variants,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const variant = await ProductVariant.findById(req.params.id)
                .populate("productId", "name slug");

            if (!variant) {
                return res.status(404).json({
                    success: false,
                    message: "Variant not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: variant,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    async getByProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const variants = await ProductVariant.find({
                productId: req.params.productId,
            });

            return res.status(200).json({
                success: true,
                count: variants.length,
                data: variants,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const variant = await ProductVariant.findById(id);

            if (!variant) {
                return res.status(404).json({
                    success: false,
                    message: "Variant not found",
                });
            }

            const files = (req.files as Express.Multer.File[]) || [];

            let imageUrls = variant.images || [];

            if (files.length > 0) {
                const uploadedImages = await Promise.all(
                    files.map(file =>
                        new Promise<string>((resolve, reject) => {
                            const stream = cloudinary.uploader.upload_stream(
                                {
                                    folder: "product-variants"
                                },
                                (error, result) => {
                                    if (error) return reject(error);

                                    resolve(result?.secure_url || "");
                                }
                            );

                            stream.end(file.buffer);
                        })
                    )
                );
            } else if (req.body.images && Array.isArray(req.body.images)) {
                imageUrls = req.body.images;
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Please upload at least one image or provide image URLs."
                });
            };

            const updatedVariant = await ProductVariant.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    images: imageUrls
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            return res.status(200).json({
                success: true,
                message: "Variant updated successfully",
                data: updatedVariant,
            });

        } catch (error) {
            next(error);
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const variant = await ProductVariant.findByIdAndDelete(req.params.id);

            if (!variant) {
                return res.status(404).json({
                    success: false,
                    message: "Variant not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Variant deleted successfully",
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};