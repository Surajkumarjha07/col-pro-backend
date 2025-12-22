import express from "express";
import connectToDB from "./database/connectDB.js";
import dotenv from "dotenv";
import path from "path";
import UserRoutes from "./routes/user-routes/index.js";

const app = express();

const ENV = process.env.NODE_ENV || "development"

// dotenc config
dotenv.config({
    path: path.resolve(process.cwd(), `environments/.env.${ENV}`)
});

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
    console.log("SERVER IS RUNNING::::::")
})

// Application Routes --------->>>>>>>>>>
app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING AT :::::::::::: ", PORT);
})
