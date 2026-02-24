import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";
import ProductUtils from "../../utils/productUtils.js";

async function UpdateProductController(req, res) {
    const { productId } = req.params;
    const { newProductName, newDescription, newPrice, newStock } = req.body;
    let newImage = req.file ? `uploads/products/${req.file.filename}` : undefined;

    const { id, email } = req.user;

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    if (!productId) {
        throw new ApiError(400, "ProductId is required!");
    }

    if (!(newProductName || newDescription || newPrice || newStock || newImage)) {
        throw new ApiError(400, "Enter atleast one field to update!");
    }

    const product = await Product.findOne(
        {
            productId,
            seller: id
        }
    );

    if (!product) {
        throw new ApiError(404, "Product doesn't exists!");
    }

    if (newProductName) {
        product.productName = newProductName;
    }
    if (newDescription) {
        product.description = newDescription;
    }
    if (newPrice) {
        product.price = newPrice
    }
    if (newStock) {
        product.stock = newStock;
    }
    if (newImage) {
        if (product.productImage) {
            await ProductUtils.deleteProductImage(product.productImage);
        }
        product.productImage = newImage;
    }

    await product.save();

    return {
        message: "Product Successfully updated!"
    }
}

export default UpdateProductController;