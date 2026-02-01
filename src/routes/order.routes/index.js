import { Router } from "express";
import authenticate from "../../middleware/authentication.js";
import OrderController from "../../controllers/order.controllers/index.js";
import asyncHandler from "../../utils/asyncHandler.js";

const orderRouter = Router();

orderRouter.post("/", authenticate, asyncHandler(OrderController.createOrderController));
orderRouter.get("/", authenticate, asyncHandler(OrderController.getAllOrdersController));
orderRouter.put("/", authenticate, asyncHandler(OrderController.cancelOrderController));
orderRouter.post("/", authenticate, asyncHandler(OrderController.buyNowController));

export default orderRouter;