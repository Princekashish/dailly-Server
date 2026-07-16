import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    slug: string;
    icon: string;
    color: string;
    sortOrder: number;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        slug: {
            type: String,
            unique: true
        },

        image: String,

        icon: String,

        color: String,

        sortOrder: {
            type: Number,
            default: 0
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

export const Category = mongoose.model<ICategory>("Category", CategorySchema);

