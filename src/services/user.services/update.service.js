import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import hashPassword from "../../utils/hashPassword.js";
import bcrypt from "bcrypt";

async function updateUserService({id, email, password, newEmail, newName, newPassword}) {    
    const user = await User.findOne({_id: id});

    if (!user) {
        throw new ApiError(404, "User doesn't exists!");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        throw new ApiError(401, "Password does not match!");
    }
    
    const response = await User.updateOne(
        {
            _id: id
        },
        {
            $set: {
                ...(newEmail && {email: newEmail}),
                ...(newName && {name: newName}),
                ...(newPassword && {password: await hashPassword(newPassword)})
            }
        }
    )

    if (!response.acknowledged) {
        throw new ApiError(500, "Error in updating data in database!");
    }

    if (response.matchedCount < 1) {
        throw new ApiError(404, "No user found for this email");
    }

    if (response.modifiedCount < 1) {
        throw new ApiError(500, "Data already updated or same as earlier!");
    }

    return {
        message: "User successfully updated!"
    }
}

export default updateUserService;