/**
 * A forma como está o index.js, com aquele loop síncrono e o readlineSync, acaba afetando o comportamento do programa de forma
 * que dificulta a visualização correta do comportamento
 */
const asaw = require("./services/asyncAwait");
// retorna imediatamente sem esperar pelo fim da promise
console.log(asaw.funcaoSincronaChamandoPromises());
console.log(asaw.funcaoSincronaChamandoAsync());
console.log(
  asaw
    .funcaoAssincronaChamandoPromises()
    .then((x) => console.log("funcaoAssincronaChamandoPromises.then", x))
);
console.log(asaw.funcaoAssincronaChamandoAsync());
