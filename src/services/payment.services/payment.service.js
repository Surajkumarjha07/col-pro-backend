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
    buyer: userId,
    _id: internalPaymentId,
  });

  if (existingPayment) {
    return await Payments.updateOne(
      {
        buyer: userId,
        _id: internalPaymentId,
      },
      {
        $set : {
          buyer: userId,
          paymentId,
          orderId,
          currency,
          amount,
          status: "paid",
        }
      },
    );
  }

  return await Payments.create({
    buyer: userId,
    orderId,
    currency,
    amount,
    status: "pending",
  });
}

export default createPaymentService;
