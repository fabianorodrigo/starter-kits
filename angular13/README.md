# Angular 13

Aplicação Angular para bootstrap de projetos com diferentes páginas para diferentes casos de uso

## Stack

- Angular
- RXJS
- Angular Material

## Uso

```shell
# Seleção da versão do Node.js via NVM
nvm use
# instalação de dependências,
npm install
# transpilação e execução
ng serve --open
```

Para testar, acesse via navegador a URL: [http://localhost:4200](http://localhost:4200)

## Como foi criado

- Execução dos comandos:

```shell
node -v > .nvmrc
ng new angular13 --skip-git
cd angular13
ng add @angular/material
# responddidos aos questionamentos
npm install bn.js
npm install --save-dev @types/bn.js
npm install @metamask/detect-provider web3 web3-eth-contract web3-utils
# para lidar com erro: BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case. Verify if you need this module and configure a polyfill for it
npm install --save-dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify
```

### Tratamento do erro de build: `BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case. Verify if you need this module and configure a polyfill for it`

**OBS:** Mesmo com as medidas abaixo, o `ng build` continuava com o erro de polyfills com a versão 13.3.\*. Tivemos que voltar para 13.1.3

- Editar tsconfig.json:

```json
"compilerOptions":{
    ...
    "paths":{
        "crypto": ["./node_modules/crypto-browserify"],
        "stream": ["./node_modules/stream-browserify"],
        "assert": ["./node_modules/assert"],
        "http": ["./node_modules/stream-http"],
        "https": ["./node_modules/https-browserify"],
        "os": ["./node_modules/os-browserify"],
    }
    ...
}
```

Editar polyfills.ts:

```typescript
import "zone.js"; // Included with Angular CLI.

import { Buffer } from "buffer";

(window as any).global = window;
global.Buffer = Buffer;
global.process = {
  env: { DEBUG: undefined },
  version: "",
  nextTick: require("next-tick"),
} as any;
```

# Fontes

https://www.notion.so/Bootstrap-com-Angular-Material-35a377613ec64c8b8e4cac05cc80b616 \
https://github.com/ChainSafe/web3.js \
https://stackoverflow.com/questions/71092985/angular-13-clean-install-wouldnt-work-with-web3-js \
https://fontawesomeicons.com/materialdesign/icons
