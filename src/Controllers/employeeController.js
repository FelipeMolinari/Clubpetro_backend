import Employee from "../Models/Employee";
import employeeValidations from "../validations/employeeValidations";
import formatCpf from "../Utils/cpfFormatter";

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
    const cpfFormated = formatCpf(cpf);

    let employee = await Employee.findOne({ cpf: cpfFormated });

    if (employee) {
      return res
        .status(400)
        .json({ err: "Employee with informed cpf already exists" });
    }

    employee = await Employee.create({
      name,
      cpf: cpfFormated,
      salary
    });

    return res.json(employee);
  },

  async update(req, res) {
    if (!(await employeeValidations.updateEmployeeValidation(req))) {
      return res.status(400).json({ error: "Validations fails" });
    }

    const { cpf } = req.params;
    const cpfFormated = formatCpf(cpf);

    let employee = await Employee.findOne({ cpf: cpfFormated });
    if (!employee) {
      return res.status(404).json({ err: "Employee does not found!" });
    }
    const { salary } = req.body;

    await (employee.salary = salary);
    employee = await Employee.updateOne({ cpfFormated }, { salary });

    return res.json(employee);
  }
};
export default employeeController;
