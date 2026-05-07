import { NextFunction, Request, Response } from "express";
import { signupService } from "../../../services/user.service";
import { AuthRequest } from "../../../middleware/auth";
export const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await signupService.createUser(req.body);
      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await signupService.loginUser(req.body);
      let ip: string | undefined;
      const forwarded = req.headers["x-forwarded-for"];
      if (Array.isArray(forwarded)) {
        ip = forwarded[0];
      } else if (typeof forwarded === "string") {
        ip = forwarded.split(",")[0];
      } else {
        ip = req.socket.remoteAddress || undefined;
      }

      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(202).json({ token });
    } catch (err) {
      next(err);
    }
  },
  async profile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id as string | undefined;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      const user = await signupService.profile(userId);
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  },
  async updating_profile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const data = req.body;
      if (!userId) return res.json({ message: "Unauthorized" });
      const user = await signupService.updating_user(data, userId);
  

      return res.status(202).json(user);
    } catch (error) {
      next(error);
    }
  },
};
