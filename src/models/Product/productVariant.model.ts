import mongoose, { Schema, Document } from "mongoose";

export interface IProductVariant extends Document {
    productId: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    barcode: string;
    title: string;
    attributes: [];
    mrp: string;
    sellingPrice: number;
    stock: number;
    lowStockAlert: number;
    images: string[];
    isDefault: Boolean;
    isActive: boolean;
}

const ProductVariantSchema = new Schema<IProductVariant>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        slug: {
            type: String,
            unique: true
        },

        barcode: String,

        title: String,

        attributes: [
            {

                name: String,

                value: String,

                unit: String

            }
        ],

        mrp: Number,

        sellingPrice: Number,

        stock: Number,

        lowStockAlert: Number,

        images: [String],

        isDefault: Boolean,

        isActive: Boolean


    },
    {
        timestamps: true
    }
);

export const ProductVariant = mongoose.model<IProductVariant>("ProductVariant", ProductVariantSchema);
