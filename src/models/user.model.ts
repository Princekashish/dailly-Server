import mongoose, { Document, Schema } from "mongoose";

export interface user extends Document {
  user: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const UserSchema: Schema<user> = new Schema(
  {
    user: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true, collection: "users" }
);

export const UserModel = mongoose.model<user>("User", UserSchema);
