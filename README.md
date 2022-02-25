## Back End - Desafio MedCloud

> Status: Finalizado.

### Objetivo:

-   Construir back end para o desafio da empresa MedCloud.

### Linguagem e Tecnologias:

-   Serverless Framework;
-   Amazon API Gateway;
-   Amazon CloudWatch;
-   Amazon CloudFormation;
-   Amazon DynamoDB;
-   AWS Lambda;
-   Node;
-   TypeScript;

### Gerenciador de pacotes:

-   yarn

### Code Style:

-   eslint
-   babel-eslint;
-   eslint / eslint-config-airbnb-base;
-   eslint-config-prettier;
-

### Dependências de desenvolvimento:

-   serverless-plugin-typescript;
-   serverless-dotenv-plugin;
-   serverless-iam-roles-per-function;
-   serverless-offline;
-   serverless-plugin-typescript;
-   serverless-pseudo-parameters;
-   aws-sdk;
-   aws-lambda;
-   jest;
-   ts-jest

### Dependências de produção:

-   joi
-   dotenv
-   uuid

### Observações para deploy:

-   Primeiro, execute o <strong>yarn install<strong/>;
-   Precisa instalar o serverless framework;
-   Criar uma conta na AWS e configurar suas credentials no serverless framework;
-   Crie um arquivo .env e insira essas variáveis:
    -   <strong>PATIENTS_TABLE_NAME = Patients-Table<strong/>;
    -   <strong>IS_PRODUCTION = true<strong/>;
-   Para deploy, o comando é: <strong>yarn deploy/serverless deploy<strong/>.

### Observações para teste offline:

-   Para executar o serverless offline é necessário que você faça uma conta na Oracle e instale o SDK do Java: https://www.oracle.com/java/technologies/downloads/#java8.
-   Em seguida, instale o módulo do dynamo usando o comando: <strong>sls install dynamodb<strong/>;
-   Mude a variável <strong>IS_PRODUCTION<strong/> no arquivo .env para false;
-   Comando para subir o servidor: <strong>sls offline start<strong/>;
-   Para usar o offline, use Insomnia ou Postman. A URL é <strong>localhost:3000<strong/>.

### Observações para teste com jest:

-   Crie um arquivo .ent.test e insira a variável:
    -   <strong>PATIENTS_TABLE_NAME = Patients-Table<strong/>;
-   Execute o <strong>yarn test<strong/>.
