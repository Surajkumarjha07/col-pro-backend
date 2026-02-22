import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";
import ProductUtils from "../../utils/productUtils.js";

async function UpdateProductService({productId, newProductName, newDescription, newPrice, newStock, newImage, sellerId}) {
    const product = await Product.findOne(
        {
            productId,
            seller: sellerId
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

export default UpdateProductService;