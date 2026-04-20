import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";//we use this because our frontend and backend are running on different ports, so we need to enable CORS to allow cross-origin requests
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import airoutes from "./routes/airoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/ai", airoutes);

// // health route
// app.get("/health", (req, res) => { //sample route to check if server is running
//     res.status(200).send("OK");
// });


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`💿💻Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });