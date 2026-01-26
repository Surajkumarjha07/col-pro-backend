import UserService from "../../services/user.services/index.js";
import ApiError from "../../utils/APIError.js";

async function deleteUserController(req, res) {
    const { id, email } = req.user;
    const { password } = req.body;

    if (!id || !email || !password) {
        throw new ApiError(400, "Required fields are missing!");
    }

    const deletedUser = await UserService.deleteUserService({id, email, password});

    return deletedUser;
}

export default deleteUserController;