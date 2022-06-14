import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  copyInto,
  createFromArray,
  createFromString,
  getLength,
  readFrom,
  writeTo,
} from "./index";

chai.use(chaiAsPromised);

export default function () {
  it(`# should create Buffer from string`, async function () {
    let b = createFromString("Ola");
    expect(b.length).to.eql(3);
    expect(b.toString()).to.eql("Ola");
    // Em UTF-8, com acento consome 4 bytes
    b = createFromString("Olá");
    expect(b.length).to.eql(4);
    expect(b.toString()).to.eql("Olá");
  });
  it(`# should create Buffer from Array of numbers`, async function () {
    const b = createFromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(b.length).to.eql(10);
  });
  it(`# should get Buffer length`, async function () {
    const b = createFromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(getLength(b)).to.eql(10);
  });
  it(`# should read Buffer in different encodings`, async function () {
    const b = createFromString("Fabiano");
    expect(readFrom(b)).to.eql("Fabiano");
    expect(readFrom(b, "ascii")).to.eql("Fabiano");
    expect(readFrom(b, "utf16le")).to.eql("慆楢湡");
  });
  it(`# should write to Buffer in different encodings`, async function () {
    const bUFT8 = Buffer.alloc(10);
    //o write retorna o número de bytes escritos. Em UTF-8, com acento consome 4 bytes
    expect(writeTo(bUFT8, "Olá")).to.eql(4);
    // O Buffer.toString, mesmo com TRIM, retorna com as posições livres (foram alocados 10 bytes)
    //\u0000 => cararacter nulo
    expect(bUFT8.toString().trim()).to.eql(
      "Olá\u0000\u0000\u0000\u0000\u0000\u0000"
    );
    const bASCII = Buffer.alloc(10);
    ////o write retorna o número de bytes escritos. Em ASCII, consome 3 bytes
    expect(writeTo(bASCII, "Olá", "ascii")).to.eql(3);
    // NO ASCII, o acento é removido
    expect(bASCII.toString("ascii")).to.eql(
      "Ola\u0000\u0000\u0000\u0000\u0000\u0000\u0000"
    );
    const b = Buffer.alloc(10);
    expect(writeTo(b, "慆楢湡", "utf16le")).to.eql(6);
    //Na volta pra UTF-8, o "o" foi perdido
    expect(b.toString()).to.eql("Fabian\u0000\u0000\u0000\u0000");
    expect(b.toString("utf16le")).to.eql("慆楢湡\u0000\u0000");
  });
  it(`# should copy data of one Buffer at the beggining of other`, async function () {
    const bSRC = Buffer.from("⚽");
    const bTARGET = Buffer.from("Chuta: ");
    //número de bytes escrito
    expect(copyInto(bSRC, bTARGET)).to.eql(3);
    // source não muda
    expect(bSRC.toString()).to.eql("⚽");
    // target tem a bola de 3 bytes enfiada no início
    expect(bTARGET.toString()).to.eql("⚽ta: ");
  });
  it(`# should copy data of one Buffer at the specific index of other`, async function () {
    const bSRC = Buffer.from("⚽");
    const bTARGET = Buffer.from("Chuta:  ");
    //número de bytes escrito
    expect(copyInto(bSRC, bTARGET, 5)).to.eql(3);
    // source não muda
    expect(bSRC.toString()).to.eql("⚽");
    // target tem a bola de 3 bytes enfiada no início
    expect(bTARGET.toString()).to.eql("Chuta⚽");
  });
}
