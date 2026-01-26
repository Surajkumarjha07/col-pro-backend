import createCartService from "./create.service.js";
import deleteCartItemService from "./delete.service.js";
import getCartsService from "./getCarts.service.js";
import updateCartService from "./update.service.js";

const CartServices = {createCartService, getCartsService, updateCartService, deleteCartItemService };

export default CartServices;
