import Product from "../../database/models/products.model.js";

async function GetAllProductsController(req, res) {
    const { page, limit } = req.query;

    const offset = (page - 1) * limit;

    const totalCount = await Product.countDocuments();
    const products = await Product.find().skip(offset).limit(limit);

    return { products, totalCount };
}

export default GetAllProductsController;