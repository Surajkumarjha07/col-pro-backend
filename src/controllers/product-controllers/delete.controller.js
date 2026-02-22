import ProductServices from "../../services/product.services/index.js";
import ApiError from "../../utils/APIError.js";

async function DeleteProductController(req, res) {
    const { productId } = req.params;

    console.log("PRODUCT ID:::::::: ", productId);

    if (!productId) {
        throw new ApiError(400, "Product Id is required!");
    }

    const deletedProduct = await ProductServices.DeleteProductService({productId});

    return deletedProduct;
}

export default DeleteProductController;