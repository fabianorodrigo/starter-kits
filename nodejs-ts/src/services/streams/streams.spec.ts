import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import fs from "fs";
import {
  readFileToWriteableStream,
  testCustomReadableAndWritableStreams,
  transformUpperCaseStream,
} from "./index";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import MyWriteableStream from "./CustomWriteableStream";
import MyReadableStream from "./CustomReadableStream";

chai.use(chaiAsPromised);
chai.use(sinonChai);

import {createFile} from "../files";
import {Stream} from "stream";
import createSongReadableStream from "./SongReadableStream";

const TEST_DIR = "./streamsTestDir/";
const FILE = TEST_DIR + "file.txt";
const CONTENT = "Apenas um teste, que hoje tem campeonato";

export default function () {
  this.beforeEach(function () {
    //apaga
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, {recursive: true});
    }
    //cria zerado
    fs.mkdirSync(TEST_DIR);
    createFile(FILE, CONTENT);
  });
  this.afterAll(function () {
    //apaga
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, {recursive: true});
    }
  });

  it(`# should read file into a Writeable Stream`, async function () {
    const writeableStream = new Stream.Writable();
    writeableStream._write = function (chunk, encoding) {
      expect(chunk.toString()).to.equal(CONTENT);
    };
    //TODO: correct this failing test using spy
    const spy = sinon.spy(writeableStream, "_write");
    await readFileToWriteableStream(FILE, writeableStream);
    expect(spy).to.have.been.called;
  });

  it(`# should test transformUpperCaseStream piped with Custom Readable and Writeable Streams`, async function () {
    const readableStream = createSongReadableStream();
    const writeableStream = MyWriteableStream;
    transformUpperCaseStream(readableStream, writeableStream);
    //expect(spy).to.have.been.called;
  });

  it(`# should test piped Custom Readable and Writeable Streams`, async function () {
    const readableStream = MyReadableStream;
    const writeableStream = MyWriteableStream;
    testCustomReadableAndWritableStreams(
      ["The", "Love", "is", "in", "the", "air"],
      readableStream,
      writeableStream
    );
    //expect(spy).to.have.been.called;
  });
}
