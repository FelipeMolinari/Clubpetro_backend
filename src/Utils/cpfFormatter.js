import { cpf as cpfFormat } from "cpf-cnpj-validator";

function formatCpf(cpf) {
  return cpfFormat.format(cpf);
}

export default formatCpf;
