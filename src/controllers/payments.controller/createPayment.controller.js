import Payments from "../../database/models/payment.model.js";
import ApiError from "../../utils/APIError.js";
import PaymentUtils from "../../utils/PaymentUtils.js";

async function createPaymentController(req, res) {
    const { id } = req.user;

    if (!id) {
        return new ApiError(401, "User not authorized!");
    }
    
    const { amount, internalPaymentId, paymentId } = req.body;

    const razorpay_order = await PaymentUtils.createRazorpayOrder(amount);

    const { id: orderId, currency } = razorpay_order;

    let payment_order;

    const existingPayment = await Payments.findOne({
        buyer: id,
        _id: internalPaymentId,
      });
    
      if (existingPayment) {
        payment_order = await Payments.updateOne(
          {
            buyer: id,
            _id: internalPaymentId,
          },
          {
            $set : {
              buyer: id,
              paymentId,
              orderId,
              currency,
              amount,
              status: "paid",
            }
          },
        );

        return {payment_order, razorpay_order};
      }
    
      payment_order = await Payments.create({
        buyer: id,
        orderId,
        currency,
        amount,
        status: "pending",
      });
    
    return {payment_order, razorpay_order};
}

export default createPaymentController;