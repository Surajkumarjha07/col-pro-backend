import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";

async function GetProductService({productId}) {    
    const product = await Product.findOne({
        _id: productId
    });

    if (!product) {
        throw new ApiError(404, "No product exists with this id::::::::::: ", productId);
    }
    
    console.log(`Product fetched with id - ${productId}`);
    return product;
}

export default GetProductService;
