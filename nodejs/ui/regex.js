const colors = require("colors");
const readlineSync = require("readline-sync");
const ui = require("./main");
const RegExpression = require("../services/regex");

module.exports = {
  show: function () {
    const TEXT = `No Jalapão, existe uma cachoeira chamada Roncadeira. Nela, existe um rapel de 70 metros! Ahhh! Foi 1000 (muito medo!)`;

    //search: /A/i
    ui.functionResult(RegExpression.getIndexFistA, TEXT);
    //replace: /A/i
    ui.functionResult(RegExpression.replaceFirstA, TEXT, "XXXXXX".bgRed);
    //replace: /A/gi
    ui.functionResult(RegExpression.replaceAs, TEXT, "XXXXXX".bgRed);
    //test: /[0-9]/
    ui.functionResult(RegExpression.containNumbers, TEXT);
    ui.functionResult(RegExpression.containNumbers, "Javascript");
    //match: /[0-9]/g
    ui.functionResult(RegExpression.matchNumericCharacters, TEXT);
    //exec: /[0-9]/g
    ui.functionResult(RegExpression.findNumericCharacters, TEXT);
    //exec: /[0-9]+/g
    ui.functionResult(RegExpression.findNumbers, TEXT);
    //RegEx
    ui.functionResult(
      RegExpression.replaceDynamically,
      TEXT,
      readlineSync.question("Type text do be replaced: "),
      "XXXXXX".bgRed
    );
  },
};
