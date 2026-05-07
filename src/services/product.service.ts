import { IProduct } from "../models/product.model";
import { ProductFilter, productRepo } from "../repositories/product.repo";

export const productService = {
    async createProduct(payload: Partial<IProduct>): Promise<IProduct> {
        // Use Partial<IProduct> because _id, createdAt, updatedAt will be generated automatically
        const product = await productRepo.create(payload);
        return product;
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