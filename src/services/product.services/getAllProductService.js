import { Types } from "mongoose";
import Product from "../../database/models/products.model.js";

async function GetAllProductsService({lastId, limit = 10}) {
    // const query = lastId ? {$lt: new Types.ObjectId(lastId)} : {};

    const products = await Product.find({})
    // .sort({_id: 1})
    // .limit(limit)

    console.log("Products fetched successfully!");
    return products;
}

export default GetAllProductsService;

