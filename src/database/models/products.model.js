import { model, Schema } from "mongoose";

const ProductSchema = Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },

    productName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    productImage: {
        type: String,
        required: true
    }

})

const Product = model("Product", ProductSchema);

export default Product;