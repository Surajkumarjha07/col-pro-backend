import express from "express";
import authenticate from "../../middleware/authentication.js";
import CartController from "../../controllers/cart.controllers/index.js";
import asyncHandler from "../../utils/asyncHandler.js";

const cartRouter = express.Router();

cartRouter.post("/", authenticate, asyncHandler(CartController.createCartController));
cartRouter.get("/", authenticate, asyncHandler(CartController.getCartsController));
cartRouter.put("/", authenticate, asyncHandler(CartController.updateCartController));
cartRouter.post("/delete", authenticate, asyncHandler(CartController.deleteCartItemController));

export default cartRouter;