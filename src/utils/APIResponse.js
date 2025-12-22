
class APIResponse {
    constructor(status = 200, message = "Success", data = {}) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = status < 400;
    }
}

export default APIResponse;