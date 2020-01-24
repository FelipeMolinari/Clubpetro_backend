import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: String,
    cpf: String,
    email: String,
    cellphone: String,
    points: Number
  },
  {
    timestamps: true
  }
);
export default mongoose.model("Client", clientSchema);
