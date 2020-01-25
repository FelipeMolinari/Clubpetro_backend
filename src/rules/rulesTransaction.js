import Transaction from "../Models/Transactions";
const statusObj = {
  status: true,
  msg: []
};
async function statusTrasaction(clientCpf, employeeCpf, value) {
  statusObj.status = true;
  statusObj.msg = [];
  const employeeTransactions = await Transaction.find({ employeeCpf });
  const clientTransactions = await Transaction.find({ clientCpf });

  await rulesTrasaction.limitPerEmployee(20, employeeTransactions);

  await rulesTrasaction.maxValue(20, employeeTransactions, value);
  await rulesTrasaction.limitPerClient(7, clientTransactions);
  await rulesTrasaction.limitTransactionsEmployeePerClient(
    3,
    employeeTransactions,
    clientCpf
  );
  if (statusObj.msg.length == 0) {
    statusObj.msg = ["Nada suspeito encontrado!"];
  }

  return statusObj;
}

const rulesTrasaction = {
  // - O mesmo frentista pode vender no máximo 20 abastecimentos no mês;

  async limitPerEmployee(limit, employeeTransactions) {
    const monthNow = new Date(Date.now()).getMonth();

    const employeeTransactionsInMonth = employeeTransactions.filter(
      ({ createdAt }) => {
        const monthTransaction = createdAt.getMonth();
        return monthTransaction == monthNow;
      }
    );

    if (employeeTransactionsInMonth.length + 1 > limit) {
      statusObj.status = false;
      statusObj.msg = [
        ...statusObj.msg,
        `O frentista fez mais de ${limit} abastecimentos por mes`
      ];
    }
  },

  // - Um único frentista pode vender no máximo 20% de todas as vendas;

  async maxValue(percent, employeeTransactions, value) {
    const toPercent = percent / 100;
    const valueEmployer = employeeTransactions
      .map(elem => {
        return elem.value;
      })
      .reduce((acumulator, num) => {
        return (acumulator += num);
      }, value);

    const totalValue = (await Transaction.find())
      .map(elem => {
        return elem.value;
      })
      .reduce((acumulator, num) => {
        return (acumulator += num);
      }, value);
    if (totalValue * toPercent < valueEmployer) {
      statusObj.status = false;
      statusObj.msg = [
        ...statusObj.msg,
        `Frentista vendeu mais de ${percent}% de todo valor de abastecimento`
      ];
    }
  },

  // - Um único cliente pode abastecer seu carro no máximo 7 vezes por mês;

  async limitPerClient(limit, clientTransactions) {
    const monthNow = new Date(Date.now()).getMonth();

    const clientTransactionsInMonth = clientTransactions.filter(transaction => {
      const monthTransaction = transaction.createdAt.getMonth();
      return monthTransaction == monthNow;
    });

    if (clientTransactionsInMonth.length + 1 > limit) {
      statusObj.status = false;
      statusObj.msg = [
        ...statusObj.msg,
        `Cliente fez mais de ${limit} de abastecimento no mês`
      ];
    }
  },

  // - Um frentista pode vender no máximo 3 vezes para o mesmo cliente.

  async limitTransactionsEmployeePerClient(
    limit,
    employeeTransactions,
    cpfClient
  ) {
    const transacEmpToCli = employeeTransactions.filter(transaction => {
      return transaction.clientCpf == cpfClient;
    });
    if (transacEmpToCli.length + 1 > limit) {
      statusObj.status = false;
      statusObj.msg = [
        ...statusObj.msg,
        `Frentista fez mais de ${limit} abastecimentos para um mesmo cliente`
      ];
    }
  }
};

export default statusTrasaction;
