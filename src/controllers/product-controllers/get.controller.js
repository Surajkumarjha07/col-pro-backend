import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";

async function GetProductController(req, res) {
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, "Product Id is required!");
    }

    const product = await Product.findOne({
        productId
    });

    if (!product) {
        throw new ApiError(404, "No product exists with this id::::::::::: ", productId);
    }

    return product;
}

export default GetProductController;