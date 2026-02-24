import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function logInUserController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Enter Valid Credentials!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password!");
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    throw new ApiError(401, "Invalid email or password!");
  }

  const token = jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  )

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  return { user, token };
}

export default logInUserController;
