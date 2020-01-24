import Employee from "../Models/Employee";
import employeeValidations from "../validations/employeeValidations";
import { cpf as cpfFormat } from "cpf-cnpj-validator";

const employeeController = {
  async index(req, res) {
    const employee = await Employee.find();

    return res.json(employee);
  },
  async store(req, res) {
    if (!(await employeeValidations.storeEmployeeValidation(req))) {
      return res.status(400).json({ error: "Validations fails" });
    }
    const { name, cpf, salary } = req.body;

    let employee = await Employee.findOne({ cpf });

    if (employee) {
      return res
        .status(400)
        .json({ err: "Employee with informed cpf already exists" });
    }

    employee = await Employee.create({
      name,
      cpf,
      salary,
      salesAmount: 0
    });

    return res.json(employee);
  },

  async update(req, res) {
    if (!(await employeeValidations.updateEmployeeValidation(req))) {
      return res.status(400).json({ error: "Validations fails" });
    }

    let { cpf } = req.params;
    cpf = cpfFormat.format(cpf);

    let employee = await Employee.findOne({ cpf });
    if (!employee) {
      return res.status(404).json({ err: "Employee does not found!" });
    }
    const { salary } = req.body;

    await (employee.salary = salary);
    employee = await Employee.updateOne({ cpf }, { salary });

    return res.json(employee);
  }
};
export default employeeController;
