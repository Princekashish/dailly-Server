import { Router } from "express";
import { validateRequest } from "../../../../middleware/validateRequest";
import { laundryItemValidator } from "../../../../validators/Laundry/laundryItems.validator";
import { laundryCategoriesValidator } from "../../../../validators/Laundry/laundryCategory.validator"
import { laundryItemsController } from "../../controllers/Laundry/laundryItems.controller";
import { laundaryCategoriesController } from "../../controllers/Laundry/laundryCategories.controller";

const router = Router();

router.post("/categories", validateRequest(laundryCategoriesValidator), laundaryCategoriesController.create);
router.post("/items", validateRequest(laundryItemValidator), laundryItemsController.create)
// get
router.get("/categories", laundaryCategoriesController.getAll)
router.get("/items", laundryItemsController.getAll);
router.get("/categories/:categoryId/items", laundryItemsController.getByCategory);
// update
router.put("/categories/:id", validateRequest(laundryCategoriesValidator), laundaryCategoriesController.updateCategory);
router.put("/items/:id", validateRequest(laundryItemValidator), laundryItemsController.updateItem);
//delete
router.delete("/categories/:id", laundaryCategoriesController.delete)
router.delete("/items/:id", laundryItemsController.delete)





export default router;