/**
 * A forma como está o index.js, com aquele loop síncrono e o readlineSync, acaba afetando o comportamento do programa de forma
 * que dificulta a visualização correta do comportamento
 */
const asaw = require("./services/asyncAwait");
// retorna imediatamente sem esperar pelo fim da promise
console.log(asaw.funcaoSincronaChamandoPromises());
console.log(asaw.funcaoSincronaChamandoAsync());
asaw.funcaoAssincronaChamandoPromisesComAwait().then((x) => console.log(x));
asaw.funcaoAssincronaChamandoPromisesSemAwait().then((x) => console.log(x));
asaw.funcaoAssincronaChamandoAsyncSemAwait().then((x) => {
  console.log(x);
});
asaw.funcaoAssincronaChamandoAsyncComAwait().then((x) => {
  console.log(x);
});
