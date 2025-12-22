import UserService from "../../services/user-services/index.js";
import ApiError from "../../utils/APIError.js";

async function updateUserController(req, res) {
    const { email, password, newEmail, newName, newPassword } = req.body;

    if (!email || !password || !(newEmail && newName && newPassword)) {
        throw new ApiError(400, "Enter valid credentials!");
    }

    await UserService.updateUserService({email, password, newEmail, newName, newPassword});
}

export default updateUserController;