import ApiError from "./APIError.js";

function hashPassword(password) {
  const saltRounds = 10;
  bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      console.log("password hashed!");
      return hashedPassword;
    })
    .catch(() => {
      console.error("Error in hashing password!");
      throw new ApiError(500, "Error in hashing password!");
    });
}

export default hashPassword;

