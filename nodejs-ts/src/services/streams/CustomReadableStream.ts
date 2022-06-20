import Stream from "stream";

const MyReadableStream = new Stream.Readable({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  read() {},
});

//The 'readable' event is emitted when there is data available to be read from the stream or when the end of the stream has been reached.
MyReadableStream.on("readable", () => {
  console.log(
    "CustomReadableStream.readable",
    MyReadableStream.read().toString()
  );
});
MyReadableStream.on("data", (chunk) => {
  console.log("MyReadableStream.data", chunk);
});
MyReadableStream.on("end", () => {
  console.log("MyReadableStream.data", "Reached end of stream.");
});

export default MyReadableStream;
