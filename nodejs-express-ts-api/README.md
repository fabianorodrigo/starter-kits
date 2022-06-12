# Node.js API

Consome API Github para obter dados de um usuário específico e mantém um cache em memória para não precisar buscar novamente os dados no Github caso uma consulta seja repetida.

## Stack

- Node.js
- Express
- Typescript
- cors
- mocha
- chai
- supertest

## Uso

```shell
# Seleção da versão do Node.js via NVM
nvm use
# instalação de dependências,
npm install
# transpilação e execução
npx tsc && node dist/index.js
```

Para testar, acesse via navegador a URL: [http://localhost:3000/?username=fabianorodrigo](http://localhost:3000/?username=fabianorodrigo)

## Como foi criado

- Execução dos comandos:

```shell
node -v > .nvmrc
npm init -y
npm install typescript --save-dev

# Once the above command succeeds, you can check the current version
npx tsc --version

npx tsc --init
npm install -save-dev @types/node
npm install @tsconfig/node16 --save-dev
npm install ts-node --save-dev
npm install eslint --save-dev
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
npm install --save-dev @types/chai @types/mocha chai mocha chai-as-promised @types/chai-as-promised supertest
npm i --save-dev @types/supertest
```

- criação pasta `src`
- Edição do tsconfig.json
- Criação do arquivo `.eslintrc.js`
- Criação do .eslintignore

# Fontes

https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html
https://dev.to/promyze/setup-mocha-in-watch-mode-for-tdd-in-node-js-1mah
