import ProductUtils from "../utils/productUtils.js";

export default function attachProductId(req, res, next) {
    if (req.params?.productId) {
        req.productId = req.params?.productId;
        return next();
    }

    req.productId = ProductUtils.createProductId();
    next();
}