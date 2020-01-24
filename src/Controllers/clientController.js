import Client from "../Models/Client";
import clientValidation from "../validations/clientValidations";
import { cpf as cpfFormat } from "cpf-cnpj-validator";

const clientController = {
  async index(req, res) {
    const clients = await Client.find();

    return res.json(clients);
  },
  async store(req, res) {
    if (!(await clientValidation.storeClientValidation(req))) {
      return res.status(400).json({ error: "Validations fails" });
    }
    const { name, cpf, email, cellphone } = req.body;

    let client = await Client.findOne({ cpf });

    if (client) {
      return res
        .status(400)
        .json({ err: "Client with informed cpf already exists" });
    }

    client = await Client.create({
      name,
      cpf,
      email,
      cellphone,
      points: 0
    });

    return res.json(client);
  },

  async update(req, res) {
    let { cpf } = req.params;
    cpf = cpfFormat.format(cpf);

    if (!(await clientValidation.updateClientValidation(req))) {
      return res.status(400).json({ error: "Validations fails" });
    }

    let client = await Client.findOne({ cpf });
    if (!client) {
      return res.status(404).json({ err: "Client does not found!" });
    }

    const { email, cellphone } = req.body;

    client = await Client.updateOne({ cpf }, { email }, { cellphone });

    return res.json(client);
  }
};

export default clientController;
