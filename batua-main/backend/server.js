import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import dbConnect from "./utils/dbConnect.js";
import transactionRoutes from "./routes/transactionRoutes.js"

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/transaction", transactionRoutes)

app.use(express.static("./frontend/build"));

app.listen(PORT, async ()=>{
    await dbConnect()
    console.log("server running at port: ", PORT)
})
