import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import bcrypt from "bcrypt";

async function logInUserService(email, password) {
    const user = await User.findOne({email}, {password: 1});

    if (!user) {
        throw new ApiError(401, "Invalid email or password!");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        throw new ApiError(401, "Invalid email or password!");
    }

    return user;
}

export default logInUserService;