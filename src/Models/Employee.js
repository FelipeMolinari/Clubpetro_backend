import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    cpf: String,
    salary: Number,
    salesAmount: Number
  },
  {
    timestamps: {
      admissionAt: "created_at"
    }
  }
);
export default mongoose.model("Employee", employeeSchema);
