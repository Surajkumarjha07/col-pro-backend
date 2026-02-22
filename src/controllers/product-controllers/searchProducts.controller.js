import ProductServices from "../../services/product.services/index.js";
import ApiError from "../../utils/APIError.js";

async function searchProduct(req, res) {
    const { query, page, limit } = req.query;

    const { id, email } = req.user;

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    const {products, productCount} = await ProductServices.searchProductService(query, page, limit);

    return {products, productCount};

}

export default searchProduct;
