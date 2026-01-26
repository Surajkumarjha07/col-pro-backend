import ProductServices from "../../services/product.services/index.js";

async function GetAllProductsController(req, res) {
    const { lastId, limit } = req.body;
    
    const products = await ProductServices.GetAllProductsService({lastId, limit});

    return products;
}

export default GetAllProductsController;