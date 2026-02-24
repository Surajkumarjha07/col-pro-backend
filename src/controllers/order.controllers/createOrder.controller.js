import Cart from "../../database/models/cart.model.js";
import Order from "../../database/models/order.model.js";
import ApiError from "../../utils/APIError.js";
import OrderUtils from "../../utils/orderUtils.js";

async function createOrderController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const cart = await Cart.findOne({ buyer: id });

    if (!cart || cart.products.length === 0) {
        throw new Error("Cart is empty");
    }

    const products = cart.products.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
    }));

    const totalItems = cart.totalItems;
    const totalAmount = cart.totalAmount;

    const order = await Order.create({
        orderId: OrderUtils.generateOrderId(),
        buyer: id,
        products,
        totalItems,
        totalAmount,
    });

    await Cart.deleteOne({ buyer: id });

    return order;
}

export default createOrderController;