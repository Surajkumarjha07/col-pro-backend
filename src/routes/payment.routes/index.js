import { Router } from "express";
import authenticate from "../../middleware/authentication.js";
import asyncHandler from "../../utils/asyncHandler.js";
import PaymentController from "../../controllers/payments.controller/index.js";

const paymentRouter = Router();

paymentRouter.post("/", authenticate, asyncHandler(PaymentController.createPaymentController));
paymentRouter.put("/", authenticate, asyncHandler(PaymentController.cancelPaymentController));

export default paymentRouter;
