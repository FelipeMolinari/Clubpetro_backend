import Transaction from "../Models/Transactions";
import Client from "../Models/Client";
import Employee from "../Models/Employee";
import statusEnum from "../Utils/enumStatusTransactions";

import statusTrasaction from "../rules/rulesTransaction";

const transactionController = {
  async store(req, res) {
    const { clientCpf, value } = req.body;

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
