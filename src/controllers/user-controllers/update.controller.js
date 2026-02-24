import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import bcrypt from "bcrypt";
import hashPassword from "../../utils/hashPassword.js";

async function updateUserController(req, res) {
    const { id, email } = req.user;
    const { password, newEmail, newName, newPassword } = req.body;

    console.log("_id:::::: ", id);

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    if (!password || !(newEmail || newName || newPassword)) {
        throw new ApiError(400, "Enter valid credentials!");
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
        throw new ApiError(404, "User doesn't exists!");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        throw new ApiError(401, "Password does not match!");
    }

    await User.updateOne(
        {
            _id: id
        },
        {
            $set: {
                ...(newEmail && { email: newEmail }),
                ...(newName && { name: newName }),
                ...(newPassword && { password: await hashPassword(newPassword) })
            }
        }
    )

    return {
        message: "User successfully updated!"
    }
}

export default updateUserController;