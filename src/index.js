import express from "express";
import connectToDB from "./database/connectDB.js";
import dotenv from "dotenv";
import path from "path";
import UserRoutes from "./routes/user.routes/index.js";
import ProductRoutes from "./routes/product.routes/index.js";
import CartRoutes from "./routes/cart.routes/index.js";
import orderRouter from "./routes/order.routes/index.js";
import paymentRouter from "./routes/payment.routes/index.js"
import ApiError from "./utils/APIError.js";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();

const ENV = process.env.NODE_ENV || "development"

// dotenc config
if (process.env.NODE_ENV !== "production") {   
    dotenv.config({
        path: path.resolve(process.cwd(), `environments/.env.${ENV}`)
    });
}

app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin);
  next();
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files ----------->>>>>>>>>>>>
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// MongoDB Connection ----------->>>>>>>>>>>
(async () => {
    await connectToDB()
    .then(() => {
        console.log("MongoDB Connected Successfully::::::::::");
    })
    .catch(error => {
        console.error("Error in connecting MongoDB:::::::: ", error.message);
        process.exit(1);
    })
})();

app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING::::::");
})

// Application Routes --------->>>>>>>>>>
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        })
    }

    return res.status(500).json({
        message: err.message
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING AT :::::::::::: ", PORT);
})
