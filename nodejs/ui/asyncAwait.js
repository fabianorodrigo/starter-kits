const colors = require("colors");
const ui = require("./main");
const asyncAwait = require("../services/asyncAwait");

module.exports = {
  show: function () {
    ui.functionResult(asyncAwait.funcaoSincronaChamandoPromises);
    ui.functionResult(asyncAwait.funcaoSincronaChamandoAsync);
    console.log(
      colors.red(
        `O resultado das funções async só é exibido ao sair do loop onde se encontra o readlineSync'. Uma opção para observar melhor o comportamento é executar 'node indexTextAsync.js' `
      )
    );
    ui.functionAsyncResult(asyncAwait.funcaoAssincronaChamandoPromisesComAwait);
    ui.functionAsyncResult(asyncAwait.funcaoAssincronaChamandoPromisesSemAwait);
    ui.functionAsyncResult(asyncAwait.funcaoAssincronaChamandoAsyncComAwait);
    ui.functionAsyncResult(asyncAwait.funcaoAssincronaChamandoAsyncSemAwait);
  },
};
