import UserService from "../../services/user.services/index.js";
import ApiError from "../../utils/APIError.js";
import APIResponse from "../../utils/APIResponse.js";

async function logInUserController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Enter Valid Credentials!");
  }

  const credentials = await UserService.logInUserService({ email, password });

  res.cookie("token", credentials.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  return credentials;
}

export default logInUserController;
