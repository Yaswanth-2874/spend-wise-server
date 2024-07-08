import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import { addTransaction } from "../controllers/transaction.controller.js";

const transactionRoute = express.Router();

transactionRoute.post("/add", verifyUser, addTransaction);
export default transactionRoute;
