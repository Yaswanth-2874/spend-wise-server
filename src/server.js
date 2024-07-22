import express from "express";
import establishMongoConnection from "./db/establishMongoConnection.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import transactionRoute from "./routes/transaction.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoute);
app.use("/api/transactions", transactionRoute);

app.listen(port, () => {
  establishMongoConnection();
  console.log(`Listening on port ${port}`);
});
