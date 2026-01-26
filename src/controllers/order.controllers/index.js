import cancelOrderController from "./cancelOrder.controller.js";
import createOrderController from "./createOrder.controller.js";
import getAllOrdersController from "./getAllOrders.controller.js";

const OrderController = {createOrderController, getAllOrdersController, cancelOrderController};

export default OrderController;