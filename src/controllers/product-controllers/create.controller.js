import Product from "../../database/models/products.model.js";
import ApiError from "../../utils/APIError.js";

async function CreateProductController(req, res) {
  const { id, email } = req.user;
  const { productName, description, category, price, stock } = req.body;

  if (!id || !email) {
    throw new ApiError(401, "User not authorized!");
  }

  if (!(productName && description && category && price && stock)) {
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

  const product = await Product.create({
    productId,
    productName,
    description,
    category,
    price,
    stock,
    productImage: `uploads/products/${productImage}`,
    seller: id
  })

  return product;
}

export default CreateProductController;
