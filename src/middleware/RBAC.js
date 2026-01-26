import ApiError from "../utils/APIError.js";

function RBAC(roles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError(401, "Authentication required!"));
        }

        const { role } = req.user;
        
        if (!roles.includes(role)) {
            return next(new ApiError(403, "You don't have perission to this route!"));
        }
        
        next();
    }
}

export default RBAC;