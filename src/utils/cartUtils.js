import crypto from "crypto";

class CartUtil {
    static generateCartId() {
        return crypto.randomBytes(10).toString("base64url");
    }
}

export default CartUtil;