import OrderService from "../../services/order.services/index.js";
import ApiError from "../../utils/APIError.js";
import OrderUtils from "../../utils/orderUtils.js";

const buyNowController = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const { amount, productId, quantity } = req.body;

    if (!amount || !quantity) {
        return new ApiError(400, "Amount and Quantity are required!");
    }

    const orderId = OrderUtils.generateOrderId();

    if (!orderId) {
        return new ApiError(500, "Error in generating order id!");
    }

    const totalAmount = quantity * amount;

    const order = await OrderService.buyNowService({buyer: id, orderId, productId, quantity, amount, totalAmount})

    return order;
}

export default buyNowController;