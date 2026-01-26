import cancelOrderService from "./cancelOrder.service.js";
import createOrderService from "./createOrder.service.js";
import getAllOrdersService from "./getAllOrders.service.js";

const OrderService = {
  createOrderService,
  getAllOrdersService,
  cancelOrderService,
};

export default OrderService;
