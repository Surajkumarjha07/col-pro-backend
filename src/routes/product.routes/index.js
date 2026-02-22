import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import ProductControllers from "../../controllers/product-controllers/index.js";
import authenticate from "../../middleware/authentication.js";
import RBAC from "../../middleware/RBAC.js";
import { uploadImage } from "../../middleware/upload.multer.js";
import attachProductId from "../../middleware/attachProductId.js";

const router = express.Router();

router.post("/", authenticate, RBAC(["seller"]), attachProductId, uploadImage.single("image"), asyncHandler(ProductControllers.CreateProductController));
router.get("/by-user", authenticate, asyncHandler(ProductControllers.getAllByUserController))
router.get("/search", authenticate, asyncHandler(ProductControllers.searchProduct));
router.get("/", authenticate, asyncHandler(ProductControllers.GetAllProductsController));
router.get("/:productId", authenticate, asyncHandler(ProductControllers.GetProductController));
router.put("/:productId", authenticate, RBAC(["seller"]), attachProductId, uploadImage.single("newImage"), asyncHandler(ProductControllers.UpdateProductController));
router.delete("/:productId", authenticate, RBAC(["seller"]), asyncHandler(ProductControllers.DeleteProductController));

export default router;
