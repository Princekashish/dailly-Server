
import { IProduct } from "../models/Product/products.model";
import slugify from "slugify";
import { ProductFilter, productRepo } from "../repositories/product.repo";
import { Category } from "../models/Product/category.mode";
import { ProductSubCategory } from "../models/Product/subCategory.model";
import { ProductSubCategoryNode } from "../models/Product/subCategoryNode.model";
import { ProductBrand } from "../models/Product/brands.model";

export const productService = {


    async createProduct(payload: Partial<IProduct>): Promise<IProduct> {

        if (!payload.name) {
            throw new Error("Product name is required");
        }

        payload.slug = slugify(payload.name, {
            lower: true,
            strict: true,
            trim: true,
        });
        const existing = await productRepo.findBySlug(payload.slug);

        if (existing) {
            throw new Error("Product already exists");
        }


        const category = await Category.findById(payload.categoryId);

        if (!category) {
            throw new Error("Category not found");
        }

        if (payload.subcategoryId) {
            const subCategory = await ProductSubCategory.findById(payload.subcategoryId);

            if (!subCategory) {
                throw new Error("Subcategory not found");
            }
        }

        if (payload.subcategoryNodeId) {
            const node = await ProductSubCategoryNode.findById(payload.subcategoryNodeId);

            if (!node) {
                throw new Error("Subcategory node not found");
            }
        }

        const brand = await ProductBrand.findById(payload.brandId);

        if (!brand) {
            throw new Error("Brand not found");
        }

        return await productRepo.create(payload);
    },
    async getAllProducts(filter: ProductFilter): Promise<IProduct[]> {
        const products = await productRepo.getAll(filter);
        return products;
    },

    async getProductById(id: string) {
        return await productRepo.getById(id);
    },

    async updateProduct(
        id: string,
        data: any
    ) {
        return await productRepo.update(id, data);
    },
    async deleteProduct(id: string): Promise<void> {
        await productRepo.delete(id);
    }


}