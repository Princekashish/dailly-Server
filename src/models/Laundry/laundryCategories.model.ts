import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
    image: string;
    isActive: boolean;
}

const LaundryCategoriesSchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true
        }


    },
    {
        timestamps: true
    }
);

export const LaundryCategories = mongoose.model<ICategory>("LaundryCategories", LaundryCategoriesSchema);
