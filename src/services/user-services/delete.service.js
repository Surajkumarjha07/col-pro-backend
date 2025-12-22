import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import bcrypt from "bcrypt";

async function deleteUserService({email, password}) {
    const user = await User.findOne({email}, {password: 1});

    if (!user) {
        throw new ApiError(404, "User already deleted or doesn't exists!");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        throw new ApiError(401, "Password doesn't match!");
    }

    User.deleteOne({_id: user._id})
    .then((deletedUser) => {
        console.log("User successfully deleted!")
        return deletedUser;
    })
    .catch(error => {
        throw new ApiError(500, "Error in deleting user from database!");
    })
}

export default deleteUserService;