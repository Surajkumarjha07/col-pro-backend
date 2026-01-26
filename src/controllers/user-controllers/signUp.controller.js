import UserService from "../../services/user.services/index.js";
import ApiError from "../../utils/APIError.js";

async function signUpUserController(req, res) {
    const { email, name, password, role } = req.body;

    if (!email || !name || !password || !role) throw new ApiError(400, "Enter required fields!");

    const user = await UserService.signUpUserService({email, name, password, role});

    return user;
}

export default signUpUserController;