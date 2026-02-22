import Product from "../../database/models/products.model.js";

async function searchProductService(query, page, limit) {
    const offset = (page - 1) * limit;

    const products = await Product.find({
        productName: {
            $regex: query,
            $options: "i"
        }
    })
    .skip(offset)
    .limit(limit)

    const productCount = await Product.find({
        productName: {
            $regex: query,
            $options: "i"
        }
    })
    .countDocuments();

    return {products, productCount};
}

export default searchProductService;
