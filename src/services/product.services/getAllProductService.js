import Product from "../../database/models/products.model.js";

async function GetAllProductsService({page = 1, limit = 10}) {
    const offset = (page - 1) * limit;

    const totalCount = await Product.countDocuments();
    const products = await Product.find().skip(offset).limit(limit);

    console.log("Products fetched successfully!");
    return {products, totalCount};
}

export default GetAllProductsService;

