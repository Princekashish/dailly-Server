import { Router } from "express";
import { validate_user_request } from "../../../middleware/validateRequest";
import { productSchema } from "../../../validators/product.validator";
import { productController } from "../controllers/product.controller";
import { upload } from "../../../middleware/upload";
const router = Router();
router.post(
    "/list-product", upload.array('images'), validate_user_request(productSchema), productController.create
);
router.get(
    "/", productController.getAll
);
router.get("/vegetable", productController.getVegetables);
router.get("/appliance", productController.getAppliances);
router.get("/electronic", productController.getElectronic);
router.get("/drinks", productController.getDrinks);
router.get("/game", productController.getGames);
router.get("/grocery", productController.getGrocery);
router.get("/fruits", productController.getFruits);
router.get("/gym", productController.getGym);
router.get("/personal-care", productController.getPersonalCare);
router.get("/snacks", productController.getSnacks);
router.get("/bulk", productController.getBulk);
router.get("/gift", productController.getGift);

// router.get("/:category", productController.getProductsByCategory);
router.get("/:id", productController.getOne);
router.put("/:id",upload.array('images'),  productController.update);
router.delete("/:id", productController.delete);

export default router;

