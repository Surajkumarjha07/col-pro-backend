import CreateProductController from "./create.controller.js";
import DeleteProductController from "./delete.controller.js";
import GetProductController from "./get.controller.js";
import GetAllProductsController from "./getAll.controller.js";
import getAllByUserController from "./getAllByUser.controller.js";
import searchProduct from "./searchProducts.controller.js";
import UpdateProductController from "./update.controller.js";

const ProductControllers = {
  CreateProductController,
  GetAllProductsController,
  getAllByUserController,
  GetProductController,
  UpdateProductController,
  DeleteProductController,
  searchProduct
};

export default ProductControllers;
