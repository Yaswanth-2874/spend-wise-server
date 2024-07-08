import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  cost: {
    type: mongoose.Decimal128,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = new mongoose.model("Transaction", transactionSchema);
export default Transaction;
