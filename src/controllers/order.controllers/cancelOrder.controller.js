import OrderService from "../../services/order.services/index.js";
import ApiError from "../../utils/APIError.js";

async function cancelOrderController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const { orderId } = req.body;

    const order = await OrderService.cancelOrderService({buyer: id, orderId});

    return order;
}

export default cancelOrderController;