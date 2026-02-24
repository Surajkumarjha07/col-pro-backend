import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";
import ProductUtils from "../../utils/productUtils.js";

async function DeleteProductController(req, res) {
    const { productId } = req.params;

    console.log("PRODUCT ID:::::::: ", productId);

    if (!productId) {
        throw new ApiError(400, "Product Id is required!");
    }

    const product = await Product.findOne({ productId });

    if (!product) {
        throw new ApiError("No product exists with this id!");
    }

    await ProductUtils.deleteProductImage(product.productImage);

    await Product.deleteOne({
        productId
    });

    return {
        message: "Product successfully deleted!"
    };
}

export default DeleteProductController;