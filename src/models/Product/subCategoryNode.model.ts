import mongoose, { Schema, Document } from "mongoose";

export interface ISubCategoryNode extends Document {
    categoryId: mongoose.Types.ObjectId;
    subcategoryId: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    image: string;
    banner: string;
    description: string;
    isFeatured: boolean;
    sortOrder: number;
    isActive: boolean;

}

const ProductSubCategoryNodeSchema = new Schema<ISubCategoryNode>(
    {
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

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

        image: String,

        banner: String,

        description: String,

        sortOrder: {
            type: Number,
            default: 0
        },

        isFeatured: {
            type: Boolean,
            default: false
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

export const ProductSubCategoryNode = mongoose.model<ISubCategoryNode>("ProductSubCategoryNode", ProductSubCategoryNodeSchema);
