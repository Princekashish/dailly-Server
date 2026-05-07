import mongoose, { Schema, Document } from "mongoose";
import { Category } from "./category.model";

export interface IProduct extends Document {
  title: string;
  description?: string;
  categoryId: mongoose.Types.ObjectId;
  price: number;
  mrp?: number;
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      trim: true
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
      index: true
    },

    price: {
      type: Number,
      required: true
    },

    mrp: {
      type: Number
    },

    stock: {
      type: Number,
      default: 0
    },

    images: {
      type: [String],
      default: []
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.index({ categoryId: 1, isActive: 1 });
ProductSchema.index({ price: 1 });

export const Product = mongoose.model<IProduct>("Product", ProductSchema);