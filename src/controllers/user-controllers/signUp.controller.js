import UserService from "../../services/user-services/index.js";

async function signUpUserController(req, res) {
    const { name, email, password } = req.body;

    if (!email || !name || !password) throw new ApiError(400, "Enter required fields!");

    await UserService.signUpUserService({name, email, password});
}

export default signUpUserController;