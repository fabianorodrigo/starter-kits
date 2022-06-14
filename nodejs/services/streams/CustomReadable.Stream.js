const Stream = require("stream");

const MyReadableStream = new Stream.Readable({
  read() {},
});
MyReadableStream.path = __filename;
//The 'readable' event is emitted when there is data available to be read from the stream or when the end of the stream has been reached.
MyReadableStream.on("readable", () => {
  console.log("MyReadableStream.readable", MyReadableStream.read().toString());
});
MyReadableStream.on("data", (chunk) => {
  console.log("MyReadableStream.data", chunk);
});
MyReadableStream.on("end", () => {
  console.log("MyReadableStream.data", "Reached end of stream.");
});

module.exports = MyReadableStream;
