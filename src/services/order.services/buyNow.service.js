import Order from "../../database/models/order.model.js";
import ApiError from "../../utils/APIError.js";

const buyNowService = async ({
  buyer,
  orderId,
  productId,
  quantity,
  amount,
  totalAmount
}) => {
  const order = await Order.create({
    buyer,
    orderId,
    products: [
      {
        productId,
        quantity,
        price: amount,
      },
    ],
    totalItems: 1,
    totalAmount,
    status: "pending",
  });

  if (!order) {
    return new ApiError(500, "Error in creating order!");
  }

  return order;
};

export default buyNowService;
