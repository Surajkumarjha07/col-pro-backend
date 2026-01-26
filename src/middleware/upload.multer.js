import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDirectory = "uploads/products";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const uniqueName = `product-${req.productId}${path.extname(file.originalname)}`
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Only images are allowed"), false);
  } else {
    cb(null, true);
  }
};

export const uploadImage = multer({storage, fileFilter, limits: 5*1024*1024});
