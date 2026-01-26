import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import bcrypt from "bcrypt";

async function deleteUserService({id, email, password}) {
    const user = await User.findOne({_id: id}, {password: 1});

    if (!user) {
        throw new ApiError(404, "User already deleted or doesn't exists!");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        throw new ApiError(401, "Password doesn't match!");
    }

    const response = await User.deleteOne({_id: id});

    if (!response.acknowledged) {
        throw new ApiError(500, "Error in deleting user");
    }

    if (response.deletedCount < 1) {
        throw new ApiError(400, "User already deleted or doesn't exist");
    }

    return user;
}

export default deleteUserService;