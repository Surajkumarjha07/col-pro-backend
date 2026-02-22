import ApiError from "../utils/APIError.js";
import jwt from "jsonwebtoken";

async function authenticate(req, res, next) {
    try {
        const token = req?.cookies?.token || req?.headers?.["authorization"]?.split("Bearer ")[1];
    
        if (!token) {
            return next(new ApiError(401, "Token not available to authorize user!"));
        }
    
        const user = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid or expired token!"));
    }
}

export default authenticate;