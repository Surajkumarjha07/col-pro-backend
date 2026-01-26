import Order from "../../database/models/order.model.js";
import ApiError from "../../utils/APIError.js";

const cancelOrderService = async ({ buyer, orderId }) => {
  const order = await Order.findOneAndUpdate(
    {
      buyer,
      orderId,
      status: "pending",
    },
    {
      $set: {
        status: "cancelled",
      },
    },
    {
      new: true,
    },
  );

  if (!order) {
    return new ApiError(404, "No order found or order cannot be cancelled!");
  }

  return order;
};

export default cancelOrderService;
