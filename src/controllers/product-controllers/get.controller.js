import ProductServices from "../../services/product.services/index.js";
import ApiError from "../../utils/APIError.js";

async function GetProductController(req, res) {
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, "Product Id is required!");
    }

    const product = await ProductServices.GetProductService({productId});

    return product;
}

export default GetProductController;