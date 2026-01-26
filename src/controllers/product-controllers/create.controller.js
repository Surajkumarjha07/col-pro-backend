import ProductServices from "../../services/product.services/index.js";
import ApiError from "../../utils/APIError.js";

async function CreateProductController(req, res) {
  const { id, email } = req.user;
  const { productName, description, price, stock } = req.body;

  if (!id || !email) {
    throw new ApiError(401, "User not authorized!");
  }

  if (!(productName && description && price && stock)) {
    throw new ApiError(400, "Enter required details!");
  }

  let productImage = req.file.filename;
  let productId = req.productId;

  if (!productImage) {
    throw new ApiError(400, "Image not provided!");
  }

  if (!productId) {
    throw new ApiError(500, "Error in creating product Id");
  }

  const product = await ProductServices.CreateProductService({
    id,
    productId,
    productName,
    description,
    price,
    stock,
    productImage,
  });

  return product;
}

export default CreateProductController;
