import Order from "../../database/models/order.model.js";

const getAllOrdersService = async ({buyer}) => {
    const orders = await Order.find({
        buyer
    })
    .populate("products.product");

    return orders;
}

export default getAllOrdersService;
