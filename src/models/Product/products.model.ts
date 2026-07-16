import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    categoryId: mongoose.Types.ObjectId;
    subcategoryId: mongoose.Types.ObjectId;
    subcategoryNodeId: mongoose.Types.ObjectId;
    brandId: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    logo: string;
    description: string;
    isActive: boolean;
    shortDescription: string;
    images: string[];
    tags: string[];
    isFeatured: Boolean,
    isTrending: Boolean,
}

const ProductSchema = new Schema<IProduct>(
    {
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "ProductCategory",
            required: true,
        },

        subcategoryId: {
            type: Schema.Types.ObjectId,
            ref: "ProductSubCategory",
            required: true,
            default: null
        },

        subcategoryNodeId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "ProductSubCategoryNode"
        },

        brandId: {
            type: Schema.Types.ObjectId,
            ref: "ProductBrand",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true
        },

        shortDescription: {
            type: String,
            trime: true,
            lowercase: true,
            required: true,

        },

        description: {
            type: String,
            trime: true,
            lowercase: true,

        },

        images: {
            type: [String],
            default: []
        },

        tags: {
            type: [String],
            default: []
        },

        isFeatured: {
            type: Boolean,
            default: false
        },

        isTrending: {
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

ProductSchema.virtual("variants", {
    ref: "ProductVariant",
    localField: "_id",
    foreignField: "productId"
});


ProductSchema.set("toJSON", {
    virtuals: true
});


ProductSchema.set("toObject", {
    virtuals: true
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
