import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    productName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    stock: {
      type: Number,
      min: 0,
      default: 0
    },

    productImage: {
      type: String,
      required: true,
    },

    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);

export default Product;
