import UserService from "../../services/user-services/index.js";
import ApiError from "../../utils/APIError.js";

async function logInUserController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Enter Valid Credentials!");
    }

    await UserService.logInUserService({email, password});
}

export default logInUserController;