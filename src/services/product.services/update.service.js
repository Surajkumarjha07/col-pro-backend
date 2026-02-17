import { Types } from "mongoose";
import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";

async function UpdateProductService({productId, newProductName, newDescription, newPrice, newStock, newImage, userId}) {
    const product = await Product.findOne(
        {
            productId,
            seller: userId
        }
    );

    if (!product) {
        throw new ApiError(404, "Product doesn't exists!");
    }

    // if (newImage) {
    //     await ProductUtils.deleteProductImage(product.productImage);
    // }

    const response = await Product.updateOne({
        productId
    },
    {
        $set: {
            ...(newProductName && {productName: newProductName}),
            ...(newDescription && {description: newDescription}),
            ...(newPrice && {price: newPrice}),
            ...(newStock && {stock: newStock}),
            ...(newImage && {productImage: newImage})
        }
    });

    if (!response.acknowledged) {
        throw new ApiError(404, "Error in updating product credentials");
    }

    if (response.modifiedCount < 1) {
        throw new ApiError(400, "Data is already being updated or doesn't exists!");
    }

    return {
        message: "Product Successfully updated!"
    }
}

export default UpdateProductService;