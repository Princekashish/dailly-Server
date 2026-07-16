import { NextFunction, Request, Response } from "express";
import cloudinary from "../../../../utils/cloudinary";
import { productService } from "../../../../services/product.service";
import slugify from "slugify";

export const productController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const files = (req.files as Express.Multer.File[]) || [];
            let imageUrls: string[] = [];

            if (files.length > 0) {
                imageUrls = await Promise.all(
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
            } else if (req.body.images && Array.isArray(req.body.images)) {
                imageUrls = req.body.images;
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Please upload at least one image or provide image URLs."
                });
            }

            // Automatically generate slug from name if not provided
            let slug = req.body.slug;
            if (!slug && req.body.name) {
                slug = slugify(req.body.name, { lower: true, strict: true, trim: true });
            }

            const productData = {
                ...req.body,
                slug,
                images: imageUrls,
            };
            const product = await productService.createProduct(productData);
            res.status(201).json({ success: true, data: product });
        } catch (err) {
            console.error("Error creating product:", err);
            next(err);
        }
    },

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filter: any = {
                categoryId: req.query.categoryId as string,
                subcategoryId: req.query.subcategoryId as string,
                brandId: req.query.brandId as string,
                name: req.query.name as string, // Changed from title to name based on new model
                isActive: req.query.isActive !== undefined ? req.query.isActive === "true" : undefined,
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
            const product = await productService.getProductById(id);

            return res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    },

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

            // If name is updated, optionally update slug
            let slug = req.body.slug;
            if (!slug && req.body.name) {
                slug = slugify(req.body.name, { lower: true, strict: true, trim: true });
            }

            const updateData = {
                ...req.body,
                images: mergedImages,
            };
            
            if (slug) {
                updateData.slug = slug;
            }

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

