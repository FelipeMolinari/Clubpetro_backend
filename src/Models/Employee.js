import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    cpf: String,
    salary: Number
  },
  {
    timestamps: true
  }
);
export default mongoose.model("Employee", employeeSchema);
