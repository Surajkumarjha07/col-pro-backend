import Cart from "../../database/models/cart.model.js";
import ApiError from "../../utils/APIError.js";
import CartUtil from "../../utils/cartUtils.js";

const createCartController = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "user not authorized to create cart!");
    }

    const { productId, quantity, price } = req.body;

    if (!productId || !quantity || !price) {
        return new ApiError(400, "Enter required details!");
    }

    let cart = await Cart.findOne({ buyer: id });

    if (!cart) {
        return await Cart.create({
            cartId: CartUtil.generateCartId(),
            buyer: id,
            products: [
                {
                    productId,
                    quantity,
                    price,
                },
            ],
            totalItems: quantity,
            totalAmount: quantity * price,
        });
    }

    const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;

        cart.totalItems += quantity;
        cart.totalAmount += quantity * price;
    } else {
        cart.products.push({
            productId,
            quantity,
            price,
        });

        cart.totalItems += quantity;
        cart.totalAmount += quantity * price;
    }

    await cart.save();

    return {
        message: "Added to cart successfully!"
    }
}

export default createCartController;