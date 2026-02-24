import Order from "../../database/models/order.model.js";
import ApiError from "../../utils/APIError.js";

async function cancelOrderController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const { orderId } = req.body;

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

    return order;
}

export default cancelOrderController;