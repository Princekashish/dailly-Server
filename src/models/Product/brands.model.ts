import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
    subcategoryId: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    logo: string;
    description: string;
    isActive: boolean;
}

const ProductBrandSchema = new Schema<IBrand>(
    {
        subcategoryId: {
            type: Schema.Types.ObjectId,
            ref: "ProductSubCategory",
            required: true,
        },
        name: {
            type: String,
            required: true
        },

        slug: String,

        logo: String,

        description: String,

        isActive: Boolean


    },
    {
        timestamps: true
    }
);

export const ProductBrand = mongoose.model<IBrand>("ProductBrand", ProductBrandSchema);
