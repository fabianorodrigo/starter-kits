# Node.js com Typescript

Setup básico de um projeto node.js com Typescript (usando npm)

## Stack

- Node.js
- Typescript

## Preparação

```shell
# Seleção da versão do Node.js via NVM
nvm use
# instalação de dependências,
npm install
```

## Execução

### Execuando o JS gerado de forma direta (Sem ts-node)

```shell
# transpilação e execução
npx tsc && node dist/main.js
```

### Executando o arquivo TS com o ts-node sem pré-transpilar

```shell
# JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node.js without precompiling
npx ts-node src/main.ts
```

## Como foi criado

- Execução dos comandos:

```shell
node -v > .nvmrc
npm init -y
npm install typescript --save-dev

# Once the above command succeeds, you can check the current version
npx tsc --version

npx tsc --init
npm install --save-dev @types/node
npm install @tsconfig/node16 --save-dev
npm install ts-node --save-dev
npm install eslint --save-dev
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
npm install --save-dev @types/chai @types/mocha chai mocha chai-as-promised @types/chai-as-promised
```

- criação pasta `src`
- Edição do tsconfig.json
- Criação do arquivo `.eslintrc.js`
- Criação do .eslintignore

# Fontes

https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html
https://dev.to/promyze/setup-mocha-in-watch-mode-for-tdd-in-node-js-1mah
