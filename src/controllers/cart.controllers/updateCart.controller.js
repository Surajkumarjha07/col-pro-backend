import CartServices from "../../services/cart.services/index.js";

const updateCartController = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "user not authorized to delete cart item!");
    }

    const { productId, flag } = req.body;

    return await CartServices.updateCartService({buyer: id, productId, flag});
}

export default updateCartController;
