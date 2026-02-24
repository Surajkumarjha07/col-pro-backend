import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";

async function getAllByUserController(req, res) {
    const { id, email } = req.user;
    const { page, limit } = req.query;

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    const offset = (page - 1) * limit;

    const totalCount = await Product.countDocuments({
        seller: id
    });

    const products = await Product.find({
        seller: id
    })
        .skip(offset)
        .limit(limit);

    return { products, totalCount };
}

export default getAllByUserController;