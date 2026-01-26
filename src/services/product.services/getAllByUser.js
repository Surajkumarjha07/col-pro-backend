import Product from "../../database/models/products.model.js";

async function getAllByUserService({id}) {
    const products = await Product.find({
        seller: id
    });

    if (!products) {
        return {
            message: "No product exists for this user!"
        }
    }

    return products;
}

export default getAllByUserService;