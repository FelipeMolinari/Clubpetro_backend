#Sistama anti fraude.

Na revenda de combustíveis, mais especificamente no programa de fidelidade do Posto de Combustíveis, é necessário um processo de auditoria para verificar se a pontuação de determinado cliente é de fato genuína. Vendas que são suspeitas de fraude vão para uma tabela onde um usuário credenciado pode aprovar ou desaprovar a venda

#Objetivo

Construir um servidor que receba informações de uma venda e, se baseando em determinadas regras de negócio, identifique essa venda como fraudulenta ou não.

- Utilizar NodeJs
- Utilizar Kafka
- MongoDB

#Regras de negócio:

1. O mesmo frentista pode vender no máximo 20 abastecimentos no mês;

2. Um único frentista pode vender no máximo 20% de todas as vendas;

3. Um único cliente pode abastecer seu carro no máximo 7 vezes por mês;

4. Um frentista pode vender no máximo 3 vezes para o mesmo cliente.

#Perguntas:

1. Por que você fez essa escolha? (Banco Sql ou NoSql)

2. Você consegue prever algum gargalo em algum comportamento específico da sua aplicação?

3. O que você sabe sobre sistemas de mensageria? Cite exemplos de casos onde é uma boa opção utilizar ou não.

4. O que você entende sobre pipelines CI/CD?
