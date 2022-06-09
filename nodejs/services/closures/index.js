// Closure é quando uma função é capaz de "lembrar" e acessar seu escopo léxico mesmo quando ela está sendo executada fora de seu escopo léxico.
//Closure é a forma de fazer com que as variáveis dentro de uma função sejam privadas e persistentes.

module.exports = {
  // O objetivo e chamar essa função várias vezes e manter o valor.
  // Se declarar uma variável global, funciona, mas qualquer outra parte do código
  // poderia modificar também. Se declarar uma variável local, não vai funcionar,
  // pois seu escopo vai se limitar à função e toda vez que chamar, vai começar do zero
  // Para resolver isso, precisamos de uma função que retorne o valor de uma função
  // que auto se invoca (uma closure).
  //
  // https://www.w3schools.com/js/js_function_closures.asp
  contadorPrivado: (function add() {
    let contador = 0;
    return function () {
      contador += 1;
      return contador;
    };
  })(),
  // não funcionou como no artigo https://medium.com/@stephanowallace/javascript-mas-afinal-o-que-s%C3%A3o-closures-4d67863ca9fc
  outroContador: function (logFunction) {
    let x = 1;
    function filho() {
      logFunction(x);
      x++;
    }
    return filho;
  },
};
