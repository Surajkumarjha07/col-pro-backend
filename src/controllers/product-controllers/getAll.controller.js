import ProductServices from "../../services/product.services/index.js";

async function GetAllProductsController(req, res) {
    const { page, limit } = req.query;
    
    const {products, totalCount} = await ProductServices.GetAllProductsService({page, limit});

    return {products, totalCount};
}

export default GetAllProductsController;