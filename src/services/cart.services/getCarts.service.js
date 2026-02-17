import Cart from "../../database/models/cart.model.js";
import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";

const getCartsService = async ({buyer}) => {
    const carts = await Cart.findOne({buyer});

    if (!carts || !carts.products || carts.products.length === 0) {
        return new ApiError(400, "No cart found!");
    }
    
    const productIds = carts.products.map((p) => p.productId);
    
    const products = await Product.find({
        _id: {
            $in: productIds,
        },
    });
    
    if (!products) {
        return new ApiError(404, "No product found!");
    }

  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  const normalizedProduct = carts.products
    .map((cartItem) => {
      const product = productMap.get(cartItem.productId.toString());
      if (!product) return null;

      return {
        _id: product._id,
        productName: product.productName,
        description: product.description,
        productImage: product.productImage,
        price: cartItem.price,
        quantity: cartItem.quantity,
      };
    })
    .filter(Boolean);


  return { carts, products: normalizedProduct };
};

export default getCartsService;
