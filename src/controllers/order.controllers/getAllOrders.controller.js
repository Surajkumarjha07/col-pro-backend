import Order from "../../database/models/order.model.js";
import ApiError from "../../utils/APIError.js";

async function getAllOrdersController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const orders = await Order.find({
        buyer: id
    })
        .populate("products.product");

    return orders;
}

export default getAllOrdersController;