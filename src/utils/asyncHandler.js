import APIResponse from "./APIResponse.js";

function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
        .then((data) => {
            if (data !== undefined) {
                const response = data instanceof APIResponse ? data : new APIResponse(200, "Success", data);
                return res.status(response.status).json(response);
            }
        })
        .catch(next);
    }
}

export default asyncHandler;