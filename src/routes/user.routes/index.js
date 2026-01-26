import express from "express";
import UserControllers from "../../controllers/user-controllers/index.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authenticate from "../../middleware/authentication.js";

const router = express.Router();

router.post("/sign-up", asyncHandler(UserControllers.signUpUserController));
router.post("/log-in", asyncHandler(UserControllers.logInUserController));
router.put("/update-user", authenticate, asyncHandler(UserControllers.updateUserController));
router.delete("/delete-user", authenticate, asyncHandler(UserControllers.deleteUserController));

export default router;