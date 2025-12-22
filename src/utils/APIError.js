
class ApiError extends Error {
    constructor(status = 500, message = "Internal Server Error!", data = {}) {
        super(message);
        this.status = status;
        this.data = data;
        this.name  = this.constructor.name;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;