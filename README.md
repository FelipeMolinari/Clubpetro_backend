## Sistama anti fraude.

Na revenda de combustíveis, mais especificamente no programa de fidelidade do Posto de Combustíveis, é necessário um processo de auditoria para verificar se a pontuação de determinado cliente é de fato genuína. Vendas que são suspeitas de fraude vão para uma tabela onde um usuário credenciado pode aprovar ou desaprovar a venda

## Objetivo

Construir um servidor que receba informações de uma venda e, se baseando em determinadas regras de negócio, identifique essa venda como fraudulenta ou não.



## Regras de negócio:

```
O mesmo frentista pode vender no máximo 20 abastecimentos no mês;
```

```
Um único frentista pode vender no máximo 20% de todas as vendas;
```
```
Um único cliente pode abastecer seu carro no máximo 7 vezes por mês;
```
```
Um frentista pode vender no máximo 3 vezes para o mesmo cliente.
```

## Tecnologias utilizadas
- [NojeJS](https://nodejs.org/en/).
- [MongoDB](https://www.mongodb.com/).

## Models:

### Client


| Campo      | Descrição                                                                                      |
| ---------- | -----------------------------------------------------------------------------------------------|
| name       | Nome do cliente cadastrado. É um campo ***obrigatório*** e a validação e feita pela biblioteca Yup. Caso nome não seja informado, mensagem de erro na validação é enviada como resposta da requisição.                               |
| cpf        | Campo obrigatório do tipo string, referente ao código ***único*** do cliente. A sua validação é feita pela biblioteca Yup. Caso cpf não seja informado, mensagem de erro na validação é enviada como resposta da requisição         |
| email      | Email do cliente, não é obrigatório e não precisa ser único                                    |
| cellphone  | Celular do client, não é obrigatório e não precisa ser único.                                  |
| createdAt  | Objeto Date do momento da criação do registo. Criado pelo Mongodb.                             |   
| updatedAt  | Objeto Date do momento da última edição do registro. Criado pelo Mongodb.                      |

### Employee


| Campo      | Descrição                                                                                      |
| ---------- | -----------------------------------------------------------------------------------------------|
| name       | Nome do funcionario tipo String. É um campo ***obrigatório*** e a validação e feita pela biblioteca Yup. Caso nome não seja informado, mensagem de erro na validação é enviada como resposta da requisição.                               |
| cpf        | Campo obrigatório do tipo string, referente ao código ***único*** do funcionario. A sua validação é feita pela biblioteca Yup. Caso cpf não seja informado, mensagem de erro na validação é enviada como resposta da requisição         |
| salary     | Salario do funcionario do tipo Number. Não é um campo obrigatório.                             |
| createdAt  | Objeto Date do momento da criação do registo. Criado pelo Mongodb.                             |   
| updatedAt  | Objeto Date do momento da última edição do registro. Criado pelo Mongodb.                      |


### Transaction

| Campo      | Descrição                                                                                      |
| ---------- | -----------------------------------------------------------------------------------------------|
| value      | Tipo Number, representa o valor da transação, por default possuí valor **zero** e não é um campo obrigatório.|
| clientCpf  | Campo **obrigatório** referênte ao cpf do cliente que fez a transação.          |
| employeeCpf| Campo preenchido automaticamente, assim que que o middleware referente a session é chamado. Veja o tópico ***Controllers*** para mais informação.                             |
|status      | Tipo string, identifica o status da transaction. Esse campo é preenchido automaticamente quando a transferência está sendo validada. Pode apresentar 3 possíveis valores: Fraudulent, noFraudulent, inAnalysis|
|msg      | Tipo vetor de string, as mensagens da transação. Esse campo é preenchido automaticamente quando a transferência está sendo validada. Pode possuir 4 valores (cada um representando uma regra) referente a transferência suspeita a ser fraudulenta, e 1 como transferência não fraudulenta|
| createdAt  | Objeto Date do momento da criação do registo. Criado pelo Mongodb.                             |   
| updatedAt  | Objeto Date do momento da última edição do registro. Criado pelo Mongodb.                      |


## Perguntas:

1. Por que você fez essa escolha? (Banco Sql ou NoSql)
  R. Devido a pouca complexidade do problema, não se tratando de um banco de dados com muitos relacionamentos optei por uma solução NoSql.
2. Você consegue prever algum gargalo em algum comportamento específico da sua aplicação?
  R. Pode acontecer alguns problemas de validação, por exemplo é permitido 2 emails iguais para diferentes clientes. Entretanto, se tratando de um protótipo e não um produto de fato, acredito que isso não seria um problema.
  
