# Node.js API com Express

Express é um framework Web de roteamento e middleware que possui funcionalidade mínima própria: Um aplicativo Express é essencialmente uma série de chamadas de função de middleware.

As funções de middleware são funções que têm acesso ao objeto de solicitação (req), ao objeto de resposta (res) e à próxima função de middleware no ciclo de solicitação-resposta do aplicativo. A próxima função de middleware é comumente denotada por uma variável chamada `next`.

As funções de middleware podem executar as seguintes tarefas:

- Executar qualquer código.
- Fazer alterações nos objetos Request e Response.
- Encerrar o ciclo de solicitação-resposta.
- Chamar a próxima função de middleware na pilha.

Uma aplicação Express pode usar os seguintes tipos de middleware:

- [Application-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application): via `app.use` ou `app.<HTTP method>`.
- [Router-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.router): via `express.Router()`;
- [Error-handling middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling): sempre recebe 4 parâmetros `(err, req, res, next) => {...}`
- [Built-in middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.built-in): exemplos são `express.static`, `express.json` e `express.urlencoded`.
- [Third-party middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.third-party): por exemplo, `cookie-parser`.

## Funcionalidades

- Exposição de uma API CRUD de pessoas em `/person` lendo de arquivos do File System
- Exposição de um endopoint para consulta compilada de dados de usuário do Github em `/usergithub?username=<user>`. Esse endpoint consome a API do Github para obter dados de um usuário específico e mantém um cache em memória para não precisar buscar novamente os dados no Github caso uma consulta seja repetida.


## Stack

- Node.js
- Express
- Typescript
- cors
- mocha
- chai
- supertest
- Redis

## Uso

```shell
# Seleção da versão do Node.js via NVM
nvm use
# instalação de dependências,
pnpm install
# transpilação e execução
npx tsc && node dist/index.js
```

Para testar, acesse via navegador a URL: [http://localhost:3000/?username=fabianorodrigo](http://localhost:3000/?username=fabianorodrigo)

## Autenticação / Autorização

O uso de access tokens e refresh tokens em estratégias de autenticação/autorização não é algo inédito. Dois protocolos de autorização e autenticação se popularizaram nos últimos anos que utilizam tokens para representar os certificados de uma pessoa para clientes terceiros: [OAuth 2.0](https://auth0.com/docs/protocols/oauth2) e [OpenID Connect](https://auth0.com/docs/protocols/oidc).

O [artigo e vídeo da Okta](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc) explica muito bem as motivações e funcionamento desses dois protocolos. Além disso, existem [diversas bibliotecas](https://oauth.net/code/nodejs/) para Node.js que implementam isso.



## Como foi criado

- Execução dos comandos:

```shell
node -v > .nvmrc
pnpm init -y
pnpm install typescript --save-dev

# Once the above command succeeds, you can check the current version
npx tsc --version

npx tsc --init
pnpm install --save-dev @types/node @tsconfig/node16
pnpm install --save-dev ts-node ts-node-dev
pnpm install --save-dev eslint 
pnpm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin 
pnpm install --save-dev @types/chai @types/mocha chai mocha chai-as-promised @types/chai-as-promised supertest
pnpm install --save-dev sinon @types/sinon sinon-chai @types/sinon-chai
pnpm install --save-dev @types/supertest

pnpm install express cors axios

pnpm install dotenv
pnpm install passport passport-local 
pnpm install passport-http-bearer
pnpm install --save-dev @types/passport
pnpm install jsonwebtoken
pnpm install --save-dev @types/jsonwebtoken
pnpm install redis
pnpm install --save-dev @types/redis

pnpm install passport-twitter
pnpm install --save @types/passport-twitter
pnpm install express-session
pnpm install --save-dev @types/express-session

# sequelize
pnpm install sequelize sequelize-cli  
pnpm install pg pg-hstore # Postgres
```

- criação pasta `src`
- Edição do tsconfig.json
- Criação do arquivo `.eslintrc.js`
- Criação do .eslintignore
- Criação do .sequilizerc ajustando para apontar para os diretórios abaixo de `./src/repositories/sequelize`

```shell
npx sequelize-cli init
# criação modelo
npx sequelize-cli model:create --name UF --attributes codigo:string,nome:string
npx sequelize-cli seed:generate --name demo-ufs
# depois de editar o seed
npx sequelize-cli db:seed:all
```

# Fontes

https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html
https://dev.to/promyze/setup-mocha-in-watch-mode-for-tdd-in-node-js-1mah
