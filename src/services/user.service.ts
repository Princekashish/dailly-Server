import z from "zod";
import { userRepo } from "../repositories/user.repo";
import { decryption, encryption } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { updating_profile } from "../validators/user.validator";

// validation the quries
export type User_profile = z.infer<typeof updating_profile>;

export const signupService = {
  async createUser(payload: {
    email: string;
    password: string;
  }) {
    const hashedPassword = await encryption(payload.password);
    return userRepo.create({
      email: payload.email,
      password: hashedPassword,
    });
  },

  async loginUser(payload: { email: string; password: string }) {
    const user = await userRepo.findByEmail(payload.email);
    if (!user) throw new Error("User not found");
    const isMatch = await decryption(payload.password, user.password);
    if (!isMatch) throw new Error("Invalid password");
    const token = generateToken({ id: user._id, email: user.email });
    return { user, token };
  },
  async profile(id: string) {
    const user = await userRepo.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  },

  async updating_user(data: User_profile ,id:string) {
    return await userRepo.updated(data,id);
  },
};
