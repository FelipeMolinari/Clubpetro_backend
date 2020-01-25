import Transaction from "../Models/Transactions";
import Client from "../Models/Client";
import Employee from "../Models/Employee";
import statusEnum from "../Utils/enumStatusTransactions";
import formatCpf from "../Utils/cpfFormatter";

import statusTrasaction from "../rules/rulesTransaction";

const transactionController = {
  async index(req, res) {
    const transactions = await Transaction.find();

    return res.json(transactions);
  },
  async store(req, res) {
    let { clientCpf } = req.body;
    clientCpf = formatCpf(clientCpf);

    const { value } = req.body;
    if (!value) {
      return res.status(400).json({ error: "Validation fails" });
    }
    const client = await Client.findOne({ cpf: clientCpf });
    if (!client) {
      return res.status(400).json({ error: "Client does not found" });
    }
    const employeeCpf = req.employeeCpf;

    const status = await statusTrasaction(clientCpf, employeeCpf, value);
    let transaction = null;

    if (status.status == true) {
      transaction = await Transaction.create({
        value,
        clientCpf,
        employeeCpf,
        status: statusEnum.noFraudulent,
        msg: ["Nada suspeito encontrado!"]
      });
    } else {
      transaction = await Transaction.create({
        value,
        clientCpf,
        employeeCpf,
        status: statusEnum.inAnalysis,
        msg: status.msg
      });
    }

    return res.json(transaction);
  }
};

export default transactionController;
