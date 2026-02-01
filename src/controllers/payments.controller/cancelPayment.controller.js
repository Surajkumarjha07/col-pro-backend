import PaymentService from "../../services/payment.services/index.js";

async function cancelPaymentController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }
    
    const { orderId } = req.body;

    await PaymentService.cancelPaymentService({userId: id, orderId});
}

export default cancelPaymentController;
