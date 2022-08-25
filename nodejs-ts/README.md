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
pnpm install
```

## Execução

### Executando o JS gerado de forma direta (Sem ts-node)

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
pnpm init -y
pnpm install typescript --save-dev

# Once the above command succeeds, you can check the current version
npx tsc --version

npx tsc --init
pnpm install --save-dev @types/node
pnpm install @tsconfig/node16 --save-dev
pnpm install --save-dev ts-node ts-node-dev
pnpm install eslint --save-dev
pnpm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
pnpm install --save-dev @types/chai @types/mocha chai mocha chai-as-promised @types/chai-as-promised
pnpm install --save-dev sinon @types/sinon sinon-chai @types/sinon-chai  
pnpm install redis
```

- criação pasta `src`
- Edição do tsconfig.json
- Criação do arquivo `.eslintrc.js`
- Criação do .eslintignore

# Fontes

https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html
https://dev.to/promyze/setup-mocha-in-watch-mode-for-tdd-in-node-js-1mah
