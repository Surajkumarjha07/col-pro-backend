import CartServices from "../../services/cart.services/index.js"
import ApiError from "../../utils/APIError.js";

const getCartsController = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const carts = await CartServices.getCartsService({buyer: id});

    return carts;
}

export default getCartsController;