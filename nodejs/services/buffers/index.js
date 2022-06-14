const colors = require("colors");

module.exports = {
  createFromString: function (text, encoding = "utf8") {
    return Buffer.from(text, encoding);
  },
  createFromArray: function (array) {
    return Buffer.from(array);
  },
  writeTo: function (buffer, text, encoding = "utf8") {
    return buffer.write(text, encoding);
  },
  readFrom: function (buffer, encoding = "utf8") {
    return buffer.toString(encoding);
  },
  getLength: function (buffer) {
    return buffer.length;
  },
  copyInto: function (bufferSource, bufferTarget, offset = 0) {
    const r = bufferSource.copy(bufferTarget, offset);
    console.log(`Buffer destino: ${colors.blue(bufferTarget.toString())}`);
    return r;
  },
};
