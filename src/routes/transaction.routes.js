import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  addTransaction,
  deleteTransaction,
  viewTransactions,
} from "../controllers/transaction.controller.js";

const transactionRoute = express.Router();

transactionRoute.post("/add", verifyUser, addTransaction);
transactionRoute.get("/view", verifyUser, viewTransactions);
transactionRoute.delete("/delete/:id", verifyUser, deleteTransaction);
export default transactionRoute;
