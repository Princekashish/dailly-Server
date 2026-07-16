import mongoose, { Schema, Document } from "mongoose";

export interface ILaundryItem extends Document {
    category: mongoose.Types.ObjectId;
    name: string;
    price: {
        normal: number;
        dryClean: number;
        iron: number;
        washIron: number;
    };
    image?: string;
    isActive: boolean;
    description?: string
}

const LaundryItemSchema = new Schema<ILaundryItem>(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: "LaundryCategories",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            normal: {
                type: Number,
                required: true,
                min: 0,
            },
            dryClean: {
                type: Number,
                required: true,
                min: 0,
            },
            iron: {
                type: Number,
                min: 0,
            },
            washIron: {
                type: Number,
                min: 0,
            },
        },
        image: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

export const LaundryItem = mongoose.model<ILaundryItem>(
    "LaundryItem",
    LaundryItemSchema
);