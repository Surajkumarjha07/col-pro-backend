import UserService from "../../services/user.services/index.js";
import ApiError from "../../utils/APIError.js";

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

    const response = await UserService.updateUserService({id, email, password, newEmail, newName, newPassword});

    return response;
}

export default updateUserController;