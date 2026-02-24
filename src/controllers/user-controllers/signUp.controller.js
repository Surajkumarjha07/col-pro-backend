import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import hashPassword from "../../utils/hashPassword.js";

async function signUpUserController(req, res) {
    const { email, name, password, role } = req.body;

    if (!email || !name || !password || !role) throw new ApiError(400, "Enter required fields!");

    const hashedPassword = await hashPassword(password);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already exists!");
    }

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    return user;
}

export default signUpUserController;