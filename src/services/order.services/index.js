import buyNowService from "./buyNow.service.js";
import cancelOrderService from "./cancelOrder.service.js";
import createOrderService from "./createOrder.service.js";
import getAllOrdersService from "./getAllOrders.service.js";

const OrderService = {
  createOrderService,
  getAllOrdersService,
  cancelOrderService,
  buyNowService
};

export default OrderService;
