import { NextFunction, Request, Response } from "express";
import { productService } from "../../../services/product.service";
import cloudinary from "../../../utils/cloudinary";
import { Category } from "../../../models/category.model";

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

    async getVegetables(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'vegetable', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getAppliances(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'appliance', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getElectronic(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'electronic', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getDrinks(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'drinks', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getFruits(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'fruits', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getGames(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'game', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getGrocery(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'grocery', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getGift(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'gift', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },
    async getGym(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'gym', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },
    async getPersonalCare(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'personal care', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },
    async getSnacks(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'snacks', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    async getBulk(req: Request, res: Response, next: NextFunction) {
        try {
            // Find categories related to 'vegetable'
            const categories = await Category.find({ name: { $regex: 'bulk', $options: 'i' } });

            if (!categories || categories.length === 0) {
                return res.status(200).json([]);
            }

            const categoryIds = categories.map(cat => cat._id.toString());

            const filter = {
                categoryIds: categoryIds,
                isActive: true
            };

            const products = await productService.getAllProducts(filter);
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    },

    // async getProductsByCategory(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) {
    //     try {
    //         const rawCategory = req.params.category;
    //         if (!rawCategory) {
    //             return res.status(400).json({
    //                 message: "Category is required",
    //             });
    //         }

    //         const category = Array.isArray(rawCategory)
    //             ? rawCategory[0]
    //             : rawCategory;

    //         const search = category.trim();

    //         const categories = await Category.find({
    //             name: new RegExp(search, "i"),
    //             isActive: true,
    //         });

    //         if (!categories.length) {
    //             return res.status(200).json([]);
    //         }
    //         const categoryIds = categories.map((cat) => cat._id.toString());

    //         const products = await productService.getAllProducts({
    //             categoryIds,
    //             isActive: true,
    //         });

    //         return res.status(200).json(products);
    //     } catch (error) {
    //         next(error);
    //     }
    // },

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
