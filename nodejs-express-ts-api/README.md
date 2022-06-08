# Node.js API

Consome API Github para obter dados de um usuário específico e mantém um cache em memória para não precisar buscar novamente os dados no Github caso uma consulta seja repetida.

## Stack

- Node.js
- Express
- Typescript
- cors

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

# Fontes

https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html
https://dev.to/promyze/setup-mocha-in-watch-mode-for-tdd-in-node-js-1mah
