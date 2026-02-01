import Payments from "../../database/models/payment.model.js";

async function cancelPaymentService({userId, orderId}) {
    
    await Payments.updateOne(
        {
            userId,
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
