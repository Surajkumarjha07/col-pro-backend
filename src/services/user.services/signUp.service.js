import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import hashPassword from "../../utils/hashPassword.js";

async function signUpUserService({email, name, password, role}) {
    const hashedPassword = await hashPassword(password);

    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new ApiError(400, "User already exists!");
    }
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    if (!user) {
        throw new ApiError(500, "User cannot be created!");
    }

    return user;
}

export default signUpUserService;