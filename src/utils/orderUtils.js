import crypto from "crypto";

class OrderUtils {
    static generateOrderId() {
        return crypto.randomBytes(10).toString("base64url");
    }
}

export default OrderUtils;