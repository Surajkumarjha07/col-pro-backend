import PaymentService from "../../services/payment.services/index.js";
import ApiError from "../../utils/APIError.js";
import PaymentUtils from "../../utils/PaymentUtils.js";

async function createPaymentController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }
    
    const { amount, internalPaymentId, paymentId } = req.body;

    console.log("PAYMENT ID:::::::::::: ", internalPaymentId);

    const razorpay_order = await PaymentUtils.createRazorpayOrder(amount);

    const { id: orderId, currency } = razorpay_order;

    const payment_order = await PaymentService.createPaymentService({userId: id, paymentId, internalPaymentId, orderId, currency, amount});
    
    return {payment_order, razorpay_order};
}

export default createPaymentController;