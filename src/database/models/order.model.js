import { model, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    orderId: {
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
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
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
    timestamps: true,
  },
);

const Order = model("Order", OrderSchema);

export default Order;
