import Product from "../../database/models/products.model.js";

async function reviewController(req, res) {
    const { id, email } = req.user;
    const { productId, userRating } = req.body;

    if (!id || !email) {
        throw new ApiError(401, "User not authorized!");
    }

    const product = await Product.findOne({
        productId
    });

    const newCount = product?.rating?.count + 1;
    const newAverage = 
    (product?.rating?.average * product?.rating?.count + userRating) / newCount;

    return await Product.findOneAndUpdate({
        productId
    },
        {
            rating: {
                average: Math.round(newAverage * 10) / 10,
                count: newCount
            }
        }
    )
}

export default reviewController;
