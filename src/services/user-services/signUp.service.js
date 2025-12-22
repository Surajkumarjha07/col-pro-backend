import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import hashPassword from "../../utils/hashPassword.js";

async function signUpUserService({email, name, password}) {
    const hashedPassword = hashPassword(password);
    
    await User.create({
        name,
        email,
        password: hashedPassword
    })
    .then((user) => {
        console.log("User Created Successfully!");
        return user;
    })
    .catch(error => {
        throw new ApiError(500, "Error in creating user!");
    })
}

export default signUpUserService;