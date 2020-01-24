import Transaction from "../Models/Transactions";
import Client from "../Models/Client";
import Employee from "../Models/Employee";

const statusObj = {
  status: true,
  msg: []
};
async function statusTrasaction(cpfClient, cpfEmployee, value) {
  const employeeTransactions = await Transaction.find({ cpfEmployee });
  const clientTransactions = await Transaction.find({ cpfClient });

  await rulesTrasaction.limitPerEmployee(3, employeeTransactions);
  await rulesTrasaction.maxValue(20, employeeTransactions);
  await rulesTrasaction.limitPerClient(7, clientTransactions);
  await rulesTrasaction.limitTransactionsEmployeePerClient(
    7,
    employeeTransactions,
    cpfClient
  );

  console.log(statusObj);
  return statusObj;
}

//

const rulesTrasaction = {
  // - O mesmo frentista pode vender no máximo 20 abastecimentos no mês;

  async limitPerEmployee(limit, employeeTransactions) {
    const monthNow = new Date(Date.now()).getMonth();
    const employeeTransactionsInMonth = employeeTransactions.filter(
      transaction => {
        const monthTransaction = transaction.createdAt.getMonth();
        return monthTransaction == monthNow;
      }
    );
    if (employeeTransactionsInMonth.length > limit) {
      statusObj.status = false;
      statusObj.msg = [
        ...statusObj.msg,
        `Frentista fez mais de ${limit} de abastecimento no mês`
      ];
    }
  },

  // - Um único frentista pode vender no máximo 20% de todas as vendas;

  async maxValue(percent, employeeTransactions) {
    const toPercent = percent / 100;
    const totalValueOfEmployee = employeeTransactions.reduce(
      (trasnPrev, transAct) => {
        trasnPrev + transAct.value;
      },
      0
    );
    const totalValue = (await Transaction.find()).reduce(
      (trasnPrev, transAct) => {
        trasnPrev + transAct.value;
      },
      0
    );

    if (totalValue * toPercent < totalValueOfEmployee) {
      statusObj.status = false;
      statusObj.msg = [
        ...statusObj.msg,
        `Frentista fez mais de ${percent}% de todo valor das vendas.`
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

    if (clientTransactionsInMonth.length > limit) {
      statusObj.status = false;
      statusObj.msg = [
        ...statusObj.msg,
        `Cliente fez mais de ${limit} abastecimentos no mês`
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
      return (transaction.cpfClient = cpfClient);
    });

    if (transacEmpToCli.length > limit) {
      statusObj.status = false;
      statusObj.msg = [
        ...statusObj.msg,
        `Frentista fez mais de ${limit} abastecimentos para um mesmo cliente`
      ];
    }
  }
};

export default statusTrasaction;
