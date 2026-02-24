import Payments from "../../database/models/payment.model.js";

async function cancelPaymentController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }

    const { orderId } = req.body;

    await Payments.updateOne(
        {
            buyer: userId,
            orderId
        },
        {
            $set: {
                status: "cancelled"
            }
        }
    )

    return {
        message: "Payment successfully cancelled!"
    }
}

export default cancelPaymentController;
