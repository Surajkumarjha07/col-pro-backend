import ProductServices from "../../services/product.services/index.js";
import ApiError from "../../utils/APIError.js";

async function UpdateProductController(req, res) {
    const { productId } = req.params;
    const {newProductName, newDescription, newPrice, newStock} = req.body;
    let newImage = `uploads/products/${req.file.filename}`;

    if (!productId) {
        throw new ApiError(400, "ProductId is required!");
    }

    if (!(newProductName || newDescription || newPrice || newStock || newImage)) {
        throw new ApiError(400, "Enter atleast one field to update!");
    }

    const response = await ProductServices.UpdateProductService({productId, newProductName, newDescription, newPrice, newStock, newImage});

    return response;
}

export default UpdateProductController;