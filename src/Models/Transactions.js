import mongoose, { mongo } from "mongoose";
import status from "../Utils/enumStatusTransactions";

const transactionsSchema = new mongoose.Schema(
  {
    value: Number,
    client: {
      type: mongoose.Types.ObjectId,
      ref: "Client"
    },
    employee: {
      type: mongoose.Types.ObjectId,
      ref: "Emproyee"
    },
    status: status.noFraudulent
  },
  { timestamps: { madeAt: "created_at" } }
);

export default mongoose.model("Transactions", transactionsSchema);
