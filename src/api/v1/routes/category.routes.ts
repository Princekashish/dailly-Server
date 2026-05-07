import { Router } from "express";
import { validate_user_request } from "../../../middleware/validateRequest";
import { categoryController } from "../controllers/category.controller";
import { createCategorySchema } from "../../../validators/category.validator";
const router = Router();
router.post(
    "/", validate_user_request(createCategorySchema), categoryController.create
);
router.get(
    "/", categoryController.getAll
);
router.get(
    "/", categoryController.getById
);

export default router;

