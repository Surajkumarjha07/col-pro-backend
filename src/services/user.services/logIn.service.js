import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function logInUserService({email, password}) {
    const user = await User.findOne({email});

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

    return { user, token };
}

export default logInUserService;