import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";
import ProductUtils from "../../utils/productUtils.js";

async function CreateProductService({id, productId, productName, description, price, stock, productImage}) {
    const product = await Product.create({
        productId,
        productName,
        description,
        price,
        stock,
        productImage: `uploads/products/${productImage}`,
        seller: id
    })

    console.log(`Product Successfully Created - ${productId}`);

    if (!product) {
        throw new ApiError(500, "Error in creating product!");
    }

    return product;
}

export default CreateProductService;