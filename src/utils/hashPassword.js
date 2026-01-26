import ApiError from "./APIError.js";
import bcrypt from "bcrypt";

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    return hashedPassword;
  } catch (error) {
    throw new ApiError(500, "Error in hashing password:::::::: ", error);
  }
}

export default hashPassword;

