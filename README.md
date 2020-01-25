# 1. Sistama anti fraude.

Na revenda de combustíveis, mais especificamente no programa de fidelidade do Posto de Combustíveis, é necessário um processo de auditoria para verificar se a pontuação de determinado cliente é de fato genuína. Vendas que são suspeitas de fraude vão para uma tabela onde um usuário credenciado pode aprovar ou desaprovar a venda



### 2. Objetivo

Construir um servidor que receba informações de uma venda e, se baseando em determinadas regras de negócio, identifique essa venda como fraudulenta ou não.

---

### 3. Regras de negócio:


 - O mesmo frentista pode vender no máximo 20 abastecimentos no mês.

 - Um único frentista pode vender no máximo 20% de todas as vendas.

 - Um único cliente pode abastecer seu carro no máximo 7 vezes por mês.

- Um frentista pode vender no máximo 3 vezes para o mesmo cliente.

---

### 4. Tecnologias utilizadas
- [NojeJS](https://nodejs.org/en/).
- [MongoDB](https://www.mongodb.com/).

---

### 5. Models:

#### 5.1 Client


| Campo      | Descrição                                                                                      |
| ---------- | -----------------------------------------------------------------------------------------------|
| name       | Nome do cliente cadastrado. É um campo ***obrigatório*** e a validação e feita pela biblioteca Yup. Caso nome não seja informado, mensagem de erro na validação é enviada como resposta da requisição.                               |
| cpf        | Campo obrigatório do tipo string, referente ao código ***único*** do cliente. A sua validação é feita pela biblioteca Yup. Caso cpf não seja informado, mensagem de erro na validação é enviada como resposta da requisição         |
| email      | Email do cliente, não é obrigatório e não precisa ser único                                    |
| cellphone  | Celular do client, não é obrigatório e não precisa ser único.                                  |
| createdAt  | Objeto Date do momento da criação do registo. Criado pelo Mongodb.                             |   
| updatedAt  | Objeto Date do momento da última edição do registro. Criado pelo Mongodb.                      |

#### 5.2 Employee


| Campo      | Descrição                                                                                      |
| ---------- | -----------------------------------------------------------------------------------------------|
| name       | Nome do funcionario tipo String. É um campo ***obrigatório*** e a validação e feita pela biblioteca Yup. Caso nome não seja informado, mensagem de erro na validação é enviada como resposta da requisição.                               |
| cpf        | Campo obrigatório do tipo string, referente ao código ***único*** do funcionario. A sua validação é feita pela biblioteca Yup. Caso cpf não seja informado, mensagem de erro na validação é enviada como resposta da requisição         |
| salary     | Salario do funcionario do tipo Number. Não é um campo obrigatório.                             |
| createdAt  | Objeto Date do momento da criação do registo. Criado pelo Mongodb.                             |   
| updatedAt  | Objeto Date do momento da última edição do registro. Criado pelo Mongodb.                      |


#### 5.3 Transaction

| Campo      | Descrição                                                                                      |
| ---------- | -----------------------------------------------------------------------------------------------|
| value      | Tipo Number, representa o valor da transação, por default possuí valor **zero** e não é um campo obrigatório.|
| clientCpf  | Campo **obrigatório** referênte ao cpf do cliente que fez a transação.          |
| employeeCpf| Campo preenchido automaticamente, assim que que o middleware referente a session é chamado. Veja o tópico ***Controllers*** para mais informação.                             |
|status      | Tipo string, identifica o status da transaction. Esse campo é preenchido automaticamente quando a transferência está sendo validada. Pode apresentar 3 possíveis valores: Fraudulent, noFraudulent, inAnalysis|
|msg      | Tipo vetor de string, as mensagens da transação. Esse campo é preenchido automaticamente quando a transferência está sendo validada. Pode possuir 4 valores (cada um representando uma regra) referente a transferência suspeita a ser fraudulenta, e 1 como transferência não fraudulenta|
| createdAt  | Objeto Date do momento da criação do registo. Criado pelo Mongodb.                             |   
| updatedAt  | Objeto Date do momento da última edição do registro. Criado pelo Mongodb.                      |

---

### 6. Controllers

#### 6.1 Client
| Método     | Descrição                                                                                      |
| ---------- | ------------------------------------------------------ |
| index      | Método que lista todos os cliente com suas informações.|
| store      | Método que adiciona um cliente no banco de dados. É feita uma validação dos campos e uma verificação do campo cpf no banco, caso a validação esteja errada ou já existir o cpf especificado, uma mensagem contendo o erro é enviada na resposta|
| update     | Método responsável por atualizar um cliente. É importante notar que só é possível alterar o email e o cellphone do cliente. |

***Observações***: 
- No método _store_() o cpf enviado deve ser um cpf válido, sendo assim, recomendo a utilização do seguinte site que gera cpfs válidos: [Gerador de CPF](https://www.geradordecpf.org/)
- O cpf pode conter ou não "." e "-". 


#### 6.2 Employee
| Método     | Descrição                                                                                      |
| ---------- | ------------------------------------------------------ |
| index      | Método que lista todos os funcionários com suas informações.|
| store      | Método que adiciona um funcionário no banco de dados. É feita uma validação dos campos e uma verificação do campo cpf no banco, caso a validação esteja errada ou já existir o cpf especificado, uma mensagem contendo o erro é enviada na resposta|
| update     | Método responsável por atualizar um responsável. É importante notar que é possível alterar somente o  salário do funcionário. (A gente conta com a honestidade do funcionário. 😂😂 ) |

***Observações***: 
- No método _store_() o cpf enviado deve ser um cpf válido, sendo assim, recomendo a utilização do seguinte site que gera cpfs válidos: [Gerador de CPF](https://www.geradordecpf.org/)
- O cpf pode conter ou não "." e "-". 

#### 6.3 Sessions

| Método     | Descrição                                                                                      |
| ---------- | ------------------------------------------------------ |
| store      | Método responsável por criar uma session, recebe como parâmetro o _cpf_ do funcionário, caso seja um cpf presente no banco de dados, um token de acesso é gerado, permitindo que um funcionário efetue uma transação.|



#### 6.4 Transactions

| Método     | Descrição                                                                                      |
| ---------- | ------------------------------------------------------ |
| index      | Método que lista todos as transações com suas informações.|
| store      | Método que cria uma nova transação, recebendo _clientCpf_ e o _value_ referente a transação, o employeeCpf é adicionado a requisição depois que o funcionário é autenticado pelo sistema. (Middleware de autentificação).|


***Observações importantes***: 
- No Headers da requisição _store_ de uma nova transação deve ter um campo _authorization_ contendo o **token** gerado pelo store de uma session. Dessa forma, eu consigo garantir que o funcionário está conectado no sistema para poder fazer finalizar uma transação. Caso o token não seja informado, a API retornará _"Token not provided"_, e a função _next()_ referente à transactionController.store não será chamada. 

---

### 7. Rotas

Os seguintes métodos foram implementados:

```js

const routes = express.Router();

routes.post("/users", clientController.store);
routes.get("/users", clientController.index);
routes.put("/users/:cpf", clientController.update);

routes.post("/employees", employeeController.store);
routes.get("/employees", employeeController.index);
routes.put("/employees/:cpf", employeeController.update);

routes.post("/sessions", sessionController.store);

routes.post("/transactions", employeeAuth, transactionController.store);
routes.get("/transactions", transactionController.index);
export default routes;

```
Importante notar que a função _employeeAuth_ é referênte ao middleware de autentificação de funcionário.

---

### Executar código:


```yarn add ``` para. adicionar todas dependências.

```yarn dev.``` para exec.

## Perguntas:

1. Por que você fez essa escolha? (Banco Sql ou NoSql)
  R. Devido a pouca complexidade do problema, não se tratando de um banco de dados com muitos relacionamentos optei por uma solução NoSql.
2. Você consegue prever algum gargalo em algum comportamento específico da sua aplicação?
  R. Pode acontecer alguns problemas de validação, por exemplo é permitido 2 emails iguais para diferentes clientes. Entretanto, se tratando de um protótipo e não um produto de fato, acredito que isso não seria um problema. 

3. O que você sabe sobre sistemas de mensageria? Cite exemplos de casos onde é uma boa opção utilizar ou não.
  R. Mensageria consiste em um sistema responsável por intermediar a comunicação entre dois servidores, tipo um middleware. No geral, o sistema de mensageria possuí algumas vantagens, um exemplo fácil de entender é o de um sistema de E-Commerce que precisa de se comunicar com um sistema que gera notas fiscais. Em um sistema sem utilização de mensageria, caso o sistema de notas fiscais fique indisponível, o sistema de E-Commerce não poderá completar a venda ou então, ficará ocioso aguardando o sistema de notas voltar. Em um sistema que utiliza mensageria, mesmo que o servidor responsável por gerar as notas fique fora de ar, a requisição será enfileirada e a nota será gerada posteriormente, sem que o sistema de E-commerce pare.
  Existem algumas técnologias que ajudam na implementação de um sistema de mensageria, em java é muito utilizado o ActiveMQ. Já para nodeJs o KafkaJS está sendo muito utilizado, e sendo constantemente atualizado no github, se mostra como uma ótima solução.
  
4. O que você entende sobre pipelines CI/CD?

 R.  Um pipeline de CI / CD ajuda a automatizar as etapas do processo de entrega do software, como iniciar a criação de código, executar testes automatizados e implantar em um ambiente de preparação ou produção. 

- É isso... Qualquer dúvida ou sujestão entre em contato. 
:email:. felipemolinari874@gmail.com
