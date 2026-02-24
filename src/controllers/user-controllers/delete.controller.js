import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import bcrypt from "bcrypt";

async function deleteUserController(req, res) {
    const { id, email } = req.user;
    const { password } = req.body;

    if (!id || !email || !password) {
        throw new ApiError(400, "Required fields are missing!");
    }

    const user = await User.findOne({ _id: id }, { password: 1 });

    if (!user) {
        throw new ApiError(404, "User already deleted or doesn't exists!");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        throw new ApiError(401, "Password doesn't match!");
    }

    await User.deleteOne({ _id: id });

    return user;
}

export default deleteUserController;