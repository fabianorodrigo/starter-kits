const ui = require("./main");
const Closure = require("../services/closures");

module.exports = {
  show: function () {
    ui.functionResult(Closure.contadorPrivado);
    // não funcionou como no artigo: https://medium.com/@stephanowallace/javascript-mas-afinal-o-que-s%C3%A3o-closures-4d67863ca9fc
    ui.functionResult(Closure.outroContador);
    Closure.outroContador(console.log);
  },
};
