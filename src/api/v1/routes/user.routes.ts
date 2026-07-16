import { Router } from "express";
import {
  signupUserSchema,
  updating_profile,
} from "../../../validators/user.validator";
import { userController } from "../controllers/user.controller";
import { requireAuth } from "../../../middleware/auth";
import { validateRequest } from "../../../middleware/validateRequest";

const router = Router();
// router.use(requireAuth);
router.post(
  "/register",
  validateRequest(signupUserSchema),
  userController.create
);
router.post(
  "/login",
  validateRequest(signupUserSchema),
  userController.login
);
router.get("/profile", requireAuth, userController.profile);
router.put(
  "/profile",
  validateRequest(updating_profile),
  userController.updating_profile
);

export default router;
