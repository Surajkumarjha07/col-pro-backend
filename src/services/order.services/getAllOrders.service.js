import Order from "../../database/models/order.model.js";

const getAllOrdersService = async ({buyer}) => {
    const orders = await Order.find({
        buyer
    });

    return orders;
}

export default getAllOrdersService;
