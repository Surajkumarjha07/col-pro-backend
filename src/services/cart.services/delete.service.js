import Cart from "../../database/models/cart.model.js";
import ApiError from "../../utils/APIError.js";

const deleteCartItemService = async ({ buyer, productId }) => {
  const cart = await Cart.findOne({
    buyer,
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
      buyer,
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

  if (!updatedCart.acknowledged) {
    return new ApiError(500, "Error in deleting cart item");
  }

  return updatedCart;
};

export default deleteCartItemService;
