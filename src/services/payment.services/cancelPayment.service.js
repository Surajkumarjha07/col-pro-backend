import Payments from "../../database/models/payment.model.js";

async function cancelPaymentService({userId, orderId}) {
    return await Payments.updateOne(
        {
            buyer: userId,
            orderId
        },
        {
            $set:{
                status: "cancelled"
            }
        }
    )
}

export default cancelPaymentService;
