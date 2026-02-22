import ApiError from "./APIError.js";
import path from "path";
import fs from "fs";

class ProductUtils {
  static createProductId() {
    const length = 6;
    const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";

    let productId = "";

    for (let i = 0; i < length; i++) {
      const alphaPosition = Math.floor(Math.random() * alphabets.length);
      const numPosition = Math.floor(Math.random() * nums.length);

      productId += alphabets[alphaPosition] + nums[numPosition];
    }

    return productId;
  }

  static async deleteProductImage(filepath) {
    if (!filepath) {
      throw new ApiError("file path not provided");
    }

    const absolutePath = path.join(process.cwd(), filepath);
    console.log("FILEPATH:::::::: ", filepath);
    console.log("ABS PATH:::::::: ", absolutePath);

    try {
      await fs.promises.access(absolutePath);
      await fs.promises.unlink(absolutePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }
}

export default ProductUtils;
