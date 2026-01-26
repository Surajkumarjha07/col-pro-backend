import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import ProductControllers from "../../controllers/product-controllers/index.js";
import authenticate from "../../middleware/authentication.js";
import RBAC from "../../middleware/RBAC.js";
import { uploadImage } from "../../middleware/upload.multer.js";
import attachProductId from "../../middleware/attachProductId.js";

const router = express.Router();

router.post("/create-product", authenticate, RBAC(["user"]), attachProductId, uploadImage.single("image"), asyncHandler(ProductControllers.CreateProductController));
router.get("/get-all", authenticate, asyncHandler(ProductControllers.GetAllProductsController));
router.get("/get-product/:productId", authenticate, asyncHandler(ProductControllers.GetProductController));
router.get("/by-user", authenticate, asyncHandler(ProductControllers.getAllByUserController))
router.put("/update-product/:productId", authenticate, RBAC(["user"]), attachProductId, uploadImage.single("newImage"), asyncHandler(ProductControllers.UpdateProductController));
router.delete("/delete-product/:productId", authenticate, RBAC(["user"]), asyncHandler(ProductControllers.DeleteProductController));

export default router;
