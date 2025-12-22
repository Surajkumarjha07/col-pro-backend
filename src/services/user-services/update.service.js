import User from "../../database/models/user.model.js";
import ApiError from "../../utils/APIError.js";
import hashPassword from "../../utils/hashPassword.js";

async function updateUserService(email, newEmail, newName, newPassword) {
    const update = {};

    if (typeof newEmail === "string" && newEmail.trim() !== "") {
        update.email = newEmail.trim();
    }

    if (typeof newName === "string" && newName.trim() !== "") {
        update.name = newName.trim();
    }

    if (typeof newPassword === "string" && newPassword.trim() !== "") {
        update.password = hashPassword(newPassword);
    }
    
    await User.findOneAndUpdate(
        {
            email
        },
        {
            $set: update
        },
        {
            new: true
        }
    )
    .then((updatedUser) => {
        console.log("User updated successfully!");
        return updatedUser;
    })
    .catch(error => {
        console.log("Error in updating user!");
        throw new ApiError(500, "Error in updating user!", error);
    })

}

export default updateUserService;