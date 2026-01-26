import { model, Schema } from "mongoose";

const CartSchema = new Schema({
  cartId: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },

  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },

  totalAmount: {
    type: Number,
    min: 0,
    required: true,
  },

  totalItems: {
    type: Number,
    min: 0,
    required: true
  }
},
{
  timestamps: true
});

const Cart = model("Cart", CartSchema);

export default Cart;
