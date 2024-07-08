import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  cost: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = new mongoose.model("Transaction", transactionSchema);
export default Transaction;
