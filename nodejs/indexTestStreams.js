/**
 * A forma como está o index.js, com aquele loop síncrono e o readlineSync, acaba afetando o comportamento do programa de forma
 * que dificulta a visualização correta do comportamento
 */
const Stream = require("stream");
const streams = require("./services/streams");

const MyCustomWriteableStream = require("./services/streams/CustomWriteableStream");
const MyCustomReadableStream = require("./services/streams/CustomReadable.Stream");

const FILE = `${process.env.HOME}/.profile`;

//// consome através de um WriteableStream
// streams.readFileToWriteableStream(FILE, MyCustomWriteableStream);

// // consome via método "on('readable', ...)" do próprio ReadableStream
// streams.consumeFileReadeableStream(FILE);

// consome um arquivo via ReadableStream conectado a um WriteableStream
streams.testCustomReadableAndWritableStreams(
  ["Opa,", "testando", "os", "Streams"],
  MyCustomReadableStream,
  MyCustomWriteableStream
);
