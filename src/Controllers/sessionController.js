import jwt from "jsonwebtoken";
import Employee from "../Models/Employee";
import formatCpf from "../Utils/cpfFormatter";
import authConfig from "../config/authConfigToken";
const sessionController = {
  async store(req, res) {
    const { cpf } = req.body;
    const cpfFormated = formatCpf(cpf);
    const employee = await Employee.findOne({ cpf: cpfFormated });

    if (!employee) {
      return res.status(401).json({ error: "Employee not found" });
    }
    const { name, salary } = employee;
    return res.json({
      employee: {
        name,
        cpf: cpfFormated,
        salary
      },
      token: jwt.sign({ cpfFormated }, authConfig.secretKey, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
};

export default sessionController;
