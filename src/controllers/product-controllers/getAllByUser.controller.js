import ProductServices from "../../services/product.services/index.js";
import ApiError from "../../utils/APIError.js";

async function getAllByUserController(req, res) {
    const { id, email } = req.user;
    const {page, limit} = req.query;

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    const {products, totalCount} = await ProductServices.getAllByUserService({id, page, limit});

    return {products, totalCount};
}

export default getAllByUserController;