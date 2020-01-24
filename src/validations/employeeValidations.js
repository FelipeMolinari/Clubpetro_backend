import * as Yup from "yup";
const { cpf } = require("cpf-cnpj-validator");

const employeeValidations = {
  async storeEmployeeValidation({ body }) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      salary: Yup.number().required()
    });
    if (!(await schema.isValid(body)) || !cpf.isValid(body.cpf)) {
      return false;
    }
    body.cpf = cpf.format(body.cpf);
    return true;
  },

  async updateEmployeeValidation({ body }) {
    const schema = Yup.object().shape({
      salary: Yup.number()
    });
    if (!(await schema.isValid(body))) {
      return false;
    }
    return true;
  }
};

export default employeeValidations;
