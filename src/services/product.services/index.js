import CreateProductService from "./create.service.js";
import DeleteProductService from "./delete.service.js";
import getAllByUserService from "./getAllByUser.js";
import GetAllProductsService from "./getAllProductService.js";
import GetProductService from "./getProduct.js";
import searchProductService from "./search.service.js";
import UpdateProductService from "./update.service.js";

const ProductServices = {
  CreateProductService,
  GetAllProductsService,
  getAllByUserService,
  GetProductService,
  UpdateProductService,
  DeleteProductService,
  searchProductService,
};

export default ProductServices;
