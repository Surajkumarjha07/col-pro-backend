import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";

async function getByCategoryController(req, res) {
    const { id, email } = req.user;
    const { category, page, limit } = req.query;

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    if (!category) {
        throw new ApiError("Category is required!");
    }

    const offset = (page - 1) * limit;

    const products = await Product.find({
        category
    })
        .skip(offset)
        .limit(limit)
        .lean();

    const totalProducts = await Product.find({
        category
    }).countDocuments();

    return {products, totalProducts};
}

export default getByCategoryController;