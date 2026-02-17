import Product from "../../database/models/products.model.js";

async function getAllByUserService({id, page, limit}) {
    const offset = (page - 1) * limit;

    const totalCount = await Product.countDocuments({
        seller: id
    });

    const products = await Product.find({
        seller: id
    })
    .skip(offset)
    .limit(limit);

    if (!products) {
        return {
            message: "No product exists for this user!"
        }
    }

    return {products, totalCount};
}

export default getAllByUserService;
