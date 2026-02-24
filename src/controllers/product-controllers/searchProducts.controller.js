import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";

async function searchProduct(req, res) {
    const { query, page, limit } = req.query;

    const { id, email } = req.user;

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    const offset = (page - 1) * limit;

    const products = await Product.find({
        productName: {
            $regex: query,
            $options: "i"
        }
    })
        .skip(offset)
        .limit(limit)

    const productCount = await Product.find({
        productName: {
            $regex: query,
            $options: "i"
        }
    })
        .countDocuments();

    return { products, productCount };
}

export default searchProduct;
