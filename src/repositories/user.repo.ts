import { user, UserModel } from "../models/user.model";
import { User_profile } from "../services/user.service";

// fetching all the DB quires
export const userRepo = {
  async create(data: Partial<user>) {
    const doc = new UserModel(data);
    return doc.save();
  },
  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  },
  async findById(id: string) {
    return await UserModel.findById(id).select("-password -confirm_password");
  },
  async updated(data: User_profile, id: string) {
    return await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
  },
};
