import mongoose, { Schema, Document } from "mongoose";

export interface ISubCategory extends Document {
    categoryId: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    image: string;
    sortOrder: number;
    isActive: boolean;
}

const ProductSubCategorySchema = new Schema<ISubCategory>(
    {
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        slug: String,

        image: String,

        sortOrder: Number,

        isActive: Boolean


    },
    {
        timestamps: true
    }
);

export const ProductSubCategory = mongoose.model<ISubCategory>("ProductSubCategory", ProductSubCategorySchema);
