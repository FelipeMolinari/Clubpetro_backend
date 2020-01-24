import * as Yup from "yup";
import { cpf as cpfFormat } from "cpf-cnpj-validator";

const clientValidations = {
  async storeClientValidation({ body }) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string().email(),
      cellphone: Yup.string().min(8)
    });
    if (!(await schema.isValid(body)) || !cpfFormat.isValid(body.cpf)) {
      return false;
    }
    body.cpf = cpfFormat.format(body.cpf);
    return true;
  },

  async updateClientValidation({ body, params }) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      cellphone: Yup.number().min(8)
    });
    if (!cpfFormat.isValid(params.cpf) || !(await schema.isValid(body))) {
      return false;
    }
    return true;
  }
};

export default clientValidations;
