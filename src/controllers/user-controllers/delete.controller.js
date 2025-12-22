import UserService from "../../services/user-services/index.js";
import ApiError from "../../utils/APIError.js";

async function deleteUserController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Enter required fields!");
    }

    await UserService.deleteUserService({email, password});
}

export default deleteUserController;