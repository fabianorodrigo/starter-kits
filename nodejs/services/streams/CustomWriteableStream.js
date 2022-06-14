const colors = require("colors");
const Stream = require("stream");

module.exports = function createNewWriteableStream() {
  /**
   * Writeable Stream Customizado
   */
  const MyWriteableStream = new Stream.Writable();
  // loga quando o writeable fechar
  MyWriteableStream.on("close", function () {
    console.log(`MyWriteableStream.close`);
  });
  // loga quando o writeable pipe
  MyWriteableStream.on("pipe", function (src) {
    console.log(`MyWriteableStream.pipe => path`, src.path);
  });
  // loga quando o writeable unpipe
  MyWriteableStream.on("unpipe", function (src) {
    console.log(`MyWriteableStream.unpipe => path`, src.path);
  });

  MyWriteableStream._write = function (chunk, encoding, next) {
    console.log("MY WRITEABLE STREAM", colors.rainbow(chunk.toString()));
    next();
  };
  return MyWriteableStream;
};
