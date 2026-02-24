import Cart from "../../database/models/cart.model.js";
import ApiError from "../../utils/APIError.js";

const deleteCartItemController = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "user not authorized to delete cart item!");
    }

    const { productId } = req.body;

    const cart = await Cart.findOne({
        buyer: id,
        "products.productId": productId,
    });

    if (!cart) {
        return new ApiError(404, "Cart not found or product doesn't exists!");
    }

    const product = cart.products.find(
        (p) => p.productId.toString() === productId,
    );

    const amountToBeDeducted = product.price * product.quantity;

    const updatedCart = await Cart.updateOne(
        {
            buyer: id,
            "products.productId": productId,
        },
        {
            $pull: {
                products: {
                    productId,
                },
            },
            $inc: {
                totalItems: -1,
                totalAmount: -amountToBeDeducted,
            },
        },
    );

    return updatedCart;
}

export default deleteCartItemController;