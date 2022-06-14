const ui = require("./main");
const Buffers = require("../services/buffers");

module.exports = {
  show: function () {
    ui.functionResult(Buffers.createFromString, "starter-kits.nodejs");
    ui.functionResult(Buffers.createFromArray, [1, 2, 3]);
    // apesar de ser apenas um caracter, os emojis ocupam mais de 1 byte por caracter
    ui.functionResult(Buffers.getLength, Buffer.from("🔑🐶"));
    // retorna a quantidade de bytes escritos
    ui.functionResult(Buffers.writeTo, Buffer.alloc(100), "writeTo example");
    ui.functionResult(Buffers.readFrom, Buffer.from("readFrom example"));
    // Sobreescreve a partir da posição informada.
    // Neste caso, o bufferTarget será sobreescrito como Eu sou SOURCE =>
    // apenas os caracteres excedentes serão visíveis
    ui.functionResult(
      Buffers.copyInto,
      Buffer.from("Eu sou SOURCE"),
      Buffer.from("Eu sou TARGET =>"),
      0
    );
    // como o Buffer não é resizeable, apenas o "E" do source será incluído na posição 15 (sobreescrevendo o ">")
    ui.functionResult(
      Buffers.copyInto,
      Buffer.from("Eu sou SOURCE"),
      Buffer.from("Eu sou TARGET =>"),
      15
    );
  },
};
