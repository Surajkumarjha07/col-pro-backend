import Order from "../../database/models/order.model.js";
import Cart from "../../database/models/cart.model.js";
import OrderUtil from "../../utils/orderUtils.js";

const createOrderService = async ({ buyer }) => {
  const cart = await Cart.findOne({ buyer });

  if (!cart || cart.products.length === 0) {
    throw new Error("Cart is empty");
  }

  const products = cart.products.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  const totalItems = cart.totalItems;
  const totalAmount = cart.totalAmount;

  const order = await Order.create({
    orderId: OrderUtil.generateOrderId(),
    buyer,
    products,
    totalItems,
    totalAmount,
    status: "pending",
  });

  await Cart.deleteOne({ buyer });

  return order;
};

export default createOrderService;
