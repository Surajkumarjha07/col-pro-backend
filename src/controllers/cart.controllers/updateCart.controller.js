import Cart from "../../database/models/cart.model.js";

const updateCartController = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "user not authorized to delete cart item!");
    }

    const { productId, flag } = req.body;

    const cart = await Cart.findOne({
        buyer: id,
        "products.productId": productId,
    });

    if (!cart || cart.products.length == 0) {
        return new ApiError(404, "No product exists!");
    }

    const product = cart.products.find(
        p => p.productId.toString() === productId.toString()
    );

    if (!product) {
        throw new ApiError(404, "Product not found in cart");
    }

    const quantityToBeUpdated = flag === "increase" ? 1 : -1;
    const amountToBeUpdated = quantityToBeUpdated * product.price;

    if (product.quantity <= 1 && flag === "decrease") {
        return await Cart.updateOne(
            {
                buyer: id,
                "products.productId": productId
            },
            {
                $inc: {
                    totalAmount: amountToBeUpdated,
                    totalItems: -1
                },

                $pull: {
                    products: {
                        productId
                    }
                }
            }
        )
    }

    const updatedCart = await Cart.updateOne(
        {
            buyer: id,
            "products.productId": productId
        },
        {
            $inc: {
                "products.$.quantity": quantityToBeUpdated,
                totalAmount: amountToBeUpdated,
            },
        },
    );

    return updatedCart;
}

export default updateCartController;
