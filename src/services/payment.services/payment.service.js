import Payments from "../../database/models/payment.model.js";

async function createPaymentService({
  userId,
  paymentId,
  internalPaymentId,
  orderId,
  currency,
  amount,
}) {
  const existingPayment = await Payments.findOne({
    userId,
    _id: internalPaymentId,
  });

  if (existingPayment) {
    return await Payments.updateOne(
      {
        userId,
        _id: internalPaymentId,
      },
      {
        userId,
        paymentId,
        orderId,
        currency,
        amount,
        status: "paid",
      },
    );
  }

  return await Payments.create({
    userId,
    orderId,
    currency,
    amount,
    status: "pending",
  });
}

export default createPaymentService;
