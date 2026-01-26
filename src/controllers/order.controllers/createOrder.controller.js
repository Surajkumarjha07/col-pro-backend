import OrderService from "../../services/order.services/index.js";
import ApiError from "../../utils/APIError.js";

async function createOrderController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const order = await OrderService.createOrderService({buyer: id});

    return order;
}

export default createOrderController;