import { IProduct, Product } from "../models/Product/products.model";

export interface ProductFilter {
    categoryId?: string;
    categoryIds?: string[];
    subcategoryId?: string;
    brandId?: string;
    name?: string;
    isActive?: boolean;
}

export const productRepo = {
    async create(data: Partial<IProduct>) {
        const doc = new Product(data);
        return doc.save();
    },
    async findBySlug(slug: string) {
        return Product.findOne({ slug });
    },
    async getAll(filter: ProductFilter = {}) {
        const query: any = {};
        if (filter.categoryId) {
            query.categoryId = filter.categoryId;
        }
        if (filter.categoryIds && filter.categoryIds.length > 0) {
            query.categoryId = { $in: filter.categoryIds };
        }
        if (filter.subcategoryId) {
            query.subcategoryId = filter.subcategoryId;
        }
        if (filter.brandId) {
            query.brandId = filter.brandId;
        }
        if (filter.name) {
            query.name = { $regex: filter.name, $options: "i" };
        }
        if (typeof filter.isActive === "boolean") {
            query.isActive = filter.isActive;
        }
        const products = await Product.find(query)
            .populate({ path: "categoryId", model: "Category", select: "name" })
            .sort({ createdAt: -1 });

        return products;
    },
    async getById(id: string) {
        return await Product.findById(id).populate({
            path: "categoryId",
            model: "Category",
            select: "name"
        });
    },

    async update(id: string, data: any) {


        return await Product.findByIdAndUpdate(id, data, { new: true });
    },
    async delete(id: string) {
        return await Product.findByIdAndDelete(id);
    }
}