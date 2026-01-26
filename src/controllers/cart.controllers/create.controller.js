import CartServices from "../../services/cart.services/index.js";
import ApiError from "../../utils/APIError.js";

const createCartController = async (req, res) => {
    const {id} = req.user;

    if (!id) {
        return new ApiError(401, "user not authorized to create cart!");
    }

    const { productId, quantity, price } = req.body;

    if (!productId || !quantity || !price) {
        return new ApiError(400, "Enter required details!");
    }

    const cart = await CartServices.createCartService({productId, quantity, price, buyer: id});

    if (!cart) {
        return new ApiError(500, "Error in creating cart!");
    }

    return cart;
}

export default createCartController;