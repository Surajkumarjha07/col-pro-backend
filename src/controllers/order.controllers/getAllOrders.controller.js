import OrderService from "../../services/order.services/index.js";
import ApiError from "../../utils/APIError.js";

async function getAllOrdersController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const orders = await OrderService.getAllOrdersService({buyer: id});

    return orders;
}

export default getAllOrdersController;