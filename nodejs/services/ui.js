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
};
