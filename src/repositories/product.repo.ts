import { IProduct, Product } from "../models/product.model";

export interface ProductFilter {
    categoryId?: string;
    categoryIds?: string[];
    title?: string;
    isActive?: boolean;
    minPrice?: number;
    maxPrice?: number;
}

export const productRepo = {
    async create(data: Partial<IProduct>) {
        const doc = new Product(data);
        return doc.save();
    },
    async getAll(filter: ProductFilter = {}) {
        const query: any = {};
        if (filter.categoryId) {
            query.categoryId = filter.categoryId;
        }
        if (filter.categoryIds && filter.categoryIds.length > 0) {
            query.categoryId = { $in: filter.categoryIds };
        }
        if (filter.title) {
            query.title = { $regex: filter.title, $options: "i" };
        }
        if (typeof filter.isActive === "boolean") {
            query.isActive = filter.isActive;
        }
        if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
            query.price = {};
            if (filter.minPrice !== undefined) query.price.$gte = filter.minPrice;
            if (filter.maxPrice !== undefined) query.price.$lte = filter.maxPrice;
        }
        const products = await Product.find(query)
            .populate("categoryId", "name")
            .sort({ createdAt: -1 });

        return products;
    },
    async getById(id: string) {
        return await Product.findById(id).populate(
            "categoryId",
            "name"
        );
    },

    async update(id: string, data: any) {
        

        return await Product.findByIdAndUpdate(id, data, { new: true });
    },
    async delete(id: string) {
        return await Product.findByIdAndDelete(id);
    }
}