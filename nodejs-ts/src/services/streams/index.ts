import Stream, {Transform} from "stream";
import fs from "fs";

export function consumeFileReadeableStream(path: string) {
  const rs = fs.createReadStream(path);
  rs.on("readable", function () {
    console.log(
      "consumindo FileReadableStream without a WritableStream",
      rs.read()
    );
  });
}
export function readFileToWriteableStream(
  path: string,
  writeableStream: Stream.Writable
) {
  const stream = fs.createReadStream(path);
  stream.pipe(writeableStream);
}

export function transformUpperCaseStream(
  readableStream: Stream.Readable,
  writableStream: Stream.Writable
) {
  const transformStream = new Transform();
  transformStream._transform = (
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: () => void
  ) => {
    transformStream.push(chunk.toString().toUpperCase());
    console.log("transformUpperCaseStream", chunk.toString());
    callback();
  };
  readableStream.pipe(transformStream).pipe(writableStream);
}
export function testCustomReadableAndWritableStreams(
  data: string[],
  readableStream: Stream.Readable,
  writableStream: Stream.Writable
) {
  readableStream.push("Push before piping");
  // conecta a saída do readableStream com a entrada do writableStream
  readableStream.pipe(writableStream);
  readableStream.push("First push after piping");
  // quando o evento close do Readable ocorrer, finaliza o writeable
  readableStream.on("close", function () {
    console.log(`READABLE.close`);
    // ensure it is not called before all write events have passed through the pipe,
    // as doing so would cause an error event to be emitted.
    writableStream.end();
  });

  // a cada segundo alimenta o readableStream com um item do array
  // quando o array esvaziar, o readableStream é fechado
  const interval = setInterval(() => {
    if (data.length === 0) {
      // envia NULL
      console.log(`READABLE.DESTROY`);
      //Calling destroy() on the readable stream causes the close event to be emitted.
      readableStream.destroy();
      clearInterval(interval);
    } else {
      //take first element from array (like "pop", but from beggining)
      const p = data.shift();
      readableStream.push(p);
    }
  }, 1000);
}
