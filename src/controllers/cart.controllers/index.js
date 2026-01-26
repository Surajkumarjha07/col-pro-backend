import createCartController from "./create.controller.js";
import deleteCartItemController from "./deleteCartItem.controller.js";
import getCartsController from "./getCart.js";
import updateCartController from "./updateCart.controller.js";

const CartController = {createCartController, getCartsController, updateCartController, deleteCartItemController};

export default CartController;