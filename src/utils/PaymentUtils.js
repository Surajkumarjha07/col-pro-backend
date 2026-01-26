import crypto from "crypto";
import Razorpay from "razorpay";
import ApiError from "./APIError.js";

class PaymentUtils {
    static generatePaymentId() {
        return crypto.randomBytes(10).toString("base64url");
    }

    static async createRazorpayOrder(amount) {
        if (isNaN(amount)) {
            return new ApiError(400, "Amount should be a number!");
        }
        
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
            headers: {
                "Content-Type": "application/json",
                "X-Razorpay-Account": process.env.RAZORPAY_MERCHANT_ID
            }
        });

        const razorpay_order = await new Promise((resolve, reject) => {
            razorpay.orders.create({
                amount: amount * 100,
                currency: "INR",
                payment_capture: true
            }, (err, order) => {
                console.log("Razorpay callback:", { err, order });
                if (err) return reject(err);
                resolve(order);
            });
        });
        
        if (!razorpay_order) {
            return new ApiError(500, "Error in creating razorpay order");
        }

        return razorpay_order;
    }
}

export default PaymentUtils;