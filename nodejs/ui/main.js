const colors = require("colors");

const BAR =
  "------------------------------------------------------------------------------------------";
module.exports = {
  printBar: function printBar(color) {
    if (color && typeof color === "function") {
      console.log(color(BAR));
    } else {
      console.log(BAR);
    }
    console.log("");
  },
  labelResult(label, result) {
    console.log(colors.grey(label), result);
    console.log("---");
  },
  labelResult2(label, result, sideEffect) {
    console.log(colors.grey(label), result, "=>", sideEffect);
    console.log("---");
  },
  functionResult(func, ...args) {
    let result;
    try {
      result = func(...args);
    } catch (e) {
      result = colors.red(e.message);
    }
    console.log(colors.grey(func.name), result);
    console.log(`Arguments: ${args}`);
    console.log("");
  },
};
