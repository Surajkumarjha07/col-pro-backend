import CartServices from "../../services/cart.services/index.js";
import ApiError from "../../utils/APIError.js";

const deleteCartItemController = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "user not authorized to delete cart item!");
    }

    const { productId } = req.body;

    return await CartServices.deleteCartItemService({buyer: id, productId});
}

export default deleteCartItemController;