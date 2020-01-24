import mongoose from "mongoose";
import status from "../Utils/enumStatusTransactions";

const transactionsSchema = new mongoose.Schema(
  {
    value: Number,
    clientCpf: String,
    employeeCpf: String,
    status: { type: String, default: status.noFraudulent },
    msg: []
  },
  { timestamps: true }
);

export default mongoose.model("Transactions", transactionsSchema);
