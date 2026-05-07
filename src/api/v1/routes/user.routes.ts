import { Router } from "express";
import { validate_user_request } from "../../../middleware/validateRequest";
import {
  signupUserSchema,
  updating_profile,
} from "../../../validators/user.validator";
import { userController } from "../controllers/user.controller";
import { requireAuth } from "../../../middleware/auth";

const router = Router();
// router.use(requireAuth);
router.post(
  "/register",
  validate_user_request(signupUserSchema),
  userController.create
);
router.post(
  "/login",
  validate_user_request(signupUserSchema),
  userController.login
);
router.get("/profile", requireAuth, userController.profile);
router.put(
  "/profile",
  validate_user_request(updating_profile),
  userController.updating_profile
);

export default router;
