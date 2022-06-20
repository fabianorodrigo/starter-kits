/**
 * A forma como está o index.js, com aquele loop síncrono e o readlineSync, acaba afetando o comportamento do programa de forma
 * que dificulta a visualização correta do comportamento
 */
const Stream = require("stream");
const streams = require("../services/streams");

const createNewWriteableStream = require("../services/streams/CustomWriteableStream");
const MyCustomReadableStream = require("../services/streams/CustomReadable.Stream");
const SongReadableStream = require("../services/streams/SongReadableStream");

const FILE = `${process.env.HOME}/.profile`;

//// consome através de um WriteableStream
streams.readFileToWriteableStream(FILE, createNewWriteableStream());

// // consome via método "on('readable', ...)" do próprio ReadableStream
streams.consumeFileReadeableStream(FILE);

// consome um arquivo via ReadableStream conectado a um WriteableStream
streams.testCustomReadableAndWritableStreams(
  ["Opa,", "testando", "os", "Streams"],
  MyCustomReadableStream,
  createNewWriteableStream()
);

// Converter para uppercase os que sai do Readable e jogar no Writeable
streams.transformUpperCaseStream(
  SongReadableStream,
  createNewWriteableStream()
);
