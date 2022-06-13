const ui = require("./main");
const asyncAwait = require("../services/asyncAwait");

module.exports = {
  show: function () {
    ui.functionResult(asyncAwait.funcaoSincronaChamadoAsyncrona);
  },
};
