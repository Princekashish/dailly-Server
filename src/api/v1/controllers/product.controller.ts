import { NextFunction, Request, Response } from "express";
import { productService } from "../../../services/product.service";
import cloudinary from "../../../utils/cloudinary";
export const productController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const files = req.files as Express.Multer.File[] || [];

            // Upload files to Cloudinary
            const imageUrls = await Promise.all(
                files.map(
                    file =>
                        new Promise<string>((resolve, reject) => {
                            const stream = cloudinary.uploader.upload_stream(
                                { folder: "products" },
                                (error, result) => {
                                    if (error) return reject(error);
                                    resolve(result?.secure_url || "");
                                }
                            );
                            stream.end(file.buffer);
                        })
                )
            );

            // Add uploaded image URLs to product data
            const productData = {
                ...req.body,
                images: imageUrls,
            };

            const product = await productService.createProduct(productData);

            console.log("req.body:", req.body);
            console.log("req.files:", req.files);

            res.status(201).json({ success: true, data: product });
        } catch (err) {
            console.error("Error creating product:", err);
            next(err);
        }
    },
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filter = {
                categoryId: req.query.categoryId as string,
                title: req.query.title as string,
                isActive: req.query.isActive !== undefined ? req.query.isActive === "true" : undefined,
                minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
                maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined
            };
            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Array.isArray(req.params.id)
                ? req.params.id[0]
                : req.params.id;
            const product = await productService.getProductById(
                id
            );

            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    },

    // product.controller.ts
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

            const files = req.files as Express.Multer.File[] || [];

            // Upload NEW images to Cloudinary
            const newImageUrls = await Promise.all(
                files.map(
                    file =>
                        new Promise<string>((resolve, reject) => {
                            const stream = cloudinary.uploader.upload_stream(
                                { folder: "products" },
                                (error, result) => {
                                    if (error) return reject(error);
                                    resolve(result?.secure_url || "");
                                }
                            );
                            stream.end(file.buffer);
                        })
                )
            );

            let existingImages: string[] = [];
            if (req.body.existingImages) {
                existingImages = Array.isArray(req.body.existingImages)
                    ? req.body.existingImages
                    : [req.body.existingImages];
            }


            const mergedImages = [...existingImages, ...newImageUrls];

            const updateData = {
                ...req.body,
                images: mergedImages,
            };

            delete updateData.existingImages;

            const updatedProduct = await productService.updateProduct(id, updateData);

            return res.status(200).json(updatedProduct);
        } catch (err) {
            console.error("Error updating product:", err);
            next(err);
        }
    },


    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

            // Get product first to access image URLs
            const product = await productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }

            // Delete images from Cloudinary
            if (product.images && product.images.length > 0) {
                await Promise.all(
                    product.images.map((imageUrl: string) => {
                        // Extract public_id from Cloudinary URL
                        // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123/products/filename.jpg
                        const parts = imageUrl.split("/");
                        const filename = parts[parts.length - 1].split(".")[0];
                        const folder = parts[parts.length - 2];
                        const publicId = `${folder}/${filename}`;
                        return cloudinary.uploader.destroy(publicId);
                    })
                );
            }

            await productService.deleteProduct(id);

            return res.status(200).json({ success: true, message: "Product deleted successfully" });
        } catch (err) {
            console.error("Error deleting product:", err);
            next(err);
        }
    }




};
