import ProductServices from "../../services/product.services/index.js";
import ApiError from "../../utils/APIError.js";

async function getAllByUserController(req, res) {
    const { id, email } = req.user;

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    const products = await ProductServices.getAllByUserService({id});

    return products;
}

export default getAllByUserController;