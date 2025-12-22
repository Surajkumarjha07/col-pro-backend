import deleteUserService from "./delete.service.js";
import logInUserService from "./logIn.service.js";
import signUpUserService from "./signUp.service.js";
import updateUserService from "./update.service.js";

const UserService = {signUpUserService, logInUserService, updateUserService, deleteUserService};

export default UserService;