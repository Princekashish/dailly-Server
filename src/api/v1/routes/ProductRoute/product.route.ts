import { Router } from "express";
import { validateRequest } from "../../../../middleware/validateRequest";
import { productCategoryValidator } from "../../../../validators/Product/category.validator";
import { ProductCategoryController } from "../../controllers/Product/productCategory.controller";
import { ProductCategoriesController } from "../../controllers/Product/productSubCategory.controller";
import { ProductSubCategoryNodeController } from "../../controllers/Product/productSubCategoryNode.controller";
import { productSubCategoryValidator } from "../../../../validators/Product/subCategory.validator";
import { productSubCategoryNodeValidator } from "../../../../validators/Product/subCategoryNode.validator";
import { productBrandValidator } from "../../../../validators/Product/brand.validator";
import { ProductBrandController } from "../../controllers/Product/productBrand.controller";
import { upload } from "../../../../middleware/upload";
import { productValidator } from "../../../../validators/Product/product.validator";
import { productController } from "../../controllers/Product/product.controller";
import { productvariantValidator } from "../../../../validators/Product/productVarient.validator";
import { productVariantController } from "../../controllers/Product/productVarient.controller";



const router = Router()

// category
router.post("/category", validateRequest(productCategoryValidator), ProductCategoryController.create)
router.get("/category", ProductCategoryController.getAll)
router.delete("/category/:id", ProductCategoryController.delete)
router.put("/category/:id", validateRequest(productCategoryValidator), ProductCategoryController.updateCategory)


//subcategory
router.post("/subcategory", validateRequest(productSubCategoryValidator), ProductCategoriesController.create)
router.get("/subcategory/:categoryId", ProductCategoriesController.getAll)
router.delete("/subcategory/:id", ProductCategoriesController.delete)
router.put("/subcategory/:id", validateRequest(productSubCategoryValidator), ProductCategoriesController.updateCategory)


//subcategoryNode
router.post("/subcategorynode", validateRequest(productSubCategoryNodeValidator), ProductSubCategoryNodeController.create)
router.get("/subcategorynode/:categoryId/:subcategoryId", ProductSubCategoryNodeController.getAll);
router.delete("/subcategorynode/:subcategoryId", ProductSubCategoryNodeController.delete)
router.put("/subcategorynode/:subcategoryId", validateRequest(productSubCategoryNodeValidator), ProductSubCategoryNodeController.updateCategory)


// brand
router.post("/brand", validateRequest(productBrandValidator), ProductBrandController.create)
router.get("/brand", ProductBrandController.getAll)
router.delete("/brand/:id", ProductBrandController.delete)
router.put("/brand/:id", validateRequest(productBrandValidator), ProductBrandController.update)



//productVarient
router.post("/varient", upload.array("images"), validateRequest(productvariantValidator), productVariantController.create);
router.get("/varient", productVariantController.getAll);
router.get("/varient/:id", productVariantController.getById);
router.get("/varient/product/:productId", productVariantController.getByProduct);
router.put("/varient/:id", upload.array("images"), productVariantController.update);
router.delete("/varient/:id", productVariantController.delete);


//product
router.post("/", upload.array('images'), validateRequest(productValidator), productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.put("/:id", upload.array('images'), productController.update);
router.delete("/:id", productController.delete);



export default router;