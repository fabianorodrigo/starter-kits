const colors = require("colors");
const ui = require("./main");
const FS = require("../services/files");
const Streams = require("../services/streams");

const MyWriteableStream = require("../services/streams/CustomWriteableStream");
const MyCustomReadableStream = require("../services/streams/CustomReadable.Stream");

module.exports = {
  show: function () {
    const FILE = "./data/teste/testeStream.txt";
    const CONTENT = "Opa, testando os Streams";
    /**
     * cria arquivos para ser utilizado pelo Stream
     */
    //
    ui.functionResult(FS.sync.mkdir, "./data/teste/", true);
    //cria arquivo
    ui.functionResult(FS.sync.createFile, FILE, CONTENT);
    ///////////////////////////
    console.log(
      colors.red(
        `A função _write do WritableStream só é exibido ao sair do loop onde se encontra o readlineSync'. Uma opção para observar melhor o comportamento é executar 'node indexTextStreams.js' `
      )
    );
    // consome através de um WriteableStream
    ui.functionResult(
      Streams.readFileToWriteableStream,
      FILE,
      MyWriteableStream
    );
    // consome via método "on('readable', ...)" do próprio ReadableStream
    ui.functionResult(Streams.consumeFileReadeableStream, FILE);

    // consome via método "on('readable', ...)" do próprio ReadableStream
    ui.functionResult(
      Streams.testCustomReadableAndWritableStreams,
      ["Wow", "testing", "Streams", "API"],
      MyCustomReadableStream,
      MyWriteableStream
    );
  },
};
