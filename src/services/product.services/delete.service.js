import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";
import ProductUtils from "../../utils/productUtils.js";

async function DeleteProductService({productId}) {
    const product = await Product.findOne({productId});

    if (!product) {
        throw new ApiError("No product exists with this id!");
    }

    await ProductUtils.deleteProductImage(product.productImage);

    const response = await Product.deleteOne({
        productId
    });

    if (!response.acknowledged) {
        throw new ApiError(500, "Error in deleting product!");
    }

    if (response.deletedCount === 0) {
        throw new ApiError(404, "No product exists or already deleted!");
    }

    console.log("Product successfully deleted!");
    return {
        message: "Product successfully deleted!"
    };
}
export default DeleteProductService;