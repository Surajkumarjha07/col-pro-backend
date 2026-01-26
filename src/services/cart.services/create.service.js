import Cart from "../../database/models/cart.model.js";
import CartUtil from "../../utils/cartUtils.js";

const addToCartService = async ({ productId, quantity, price, buyer }) => {
  let cart = await Cart.findOne({ buyer });

  if (!cart) {
    return await Cart.create({
      cartId: CartUtil.generateCartId(),
      buyer,
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
  return cart;
};

export default addToCartService;
