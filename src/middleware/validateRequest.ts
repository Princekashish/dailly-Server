import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validate_user_request =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: err.errors || err });
    }
  };
