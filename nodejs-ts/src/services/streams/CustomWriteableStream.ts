import Stream from "stream";

/**
 * Writeable Stream Customizado
 */
const MyWriteableStream = new Stream.Writable();
// loga quando o writeable fechar
MyWriteableStream.on("close", function () {
  console.log(`MyWriteableStream.close`);
});
// loga quando o writeable pipe
MyWriteableStream.on("pipe", function (src: any) {
  console.log(`MyWriteableStream.pipe => path`, src.path);
});
// loga quando o writeable unpipe
MyWriteableStream.on("unpipe", function (src: any) {
  console.log(`MyWriteableStream.unpipe => path`, src.path);
});

MyWriteableStream._write = function (chunk, encoding, next) {
  console.log("MY WRITEABLE STREAM", chunk.toString());
  next();
};

export default MyWriteableStream;
