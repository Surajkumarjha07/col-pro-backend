import { model, Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentId: {
      type: String,
      required: false,
      index: true,
    },

    orderId: {
        type: String,
        required: true,
        unique: true
    },

    currency: {
        type: String,
        required: true
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Payments = model("Payment", PaymentSchema);

export default Payments;
