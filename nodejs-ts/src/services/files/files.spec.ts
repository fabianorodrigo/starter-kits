import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import fs, {promises as fsPromises} from "fs";
import {
  mkdir,
  canRead,
  rmdir,
  listDirFiles,
  canWrite,
  createFile,
  resolvePath,
  readFile,
  appendFile,
  renameFile,
  deleteFile,
  stats,
  openFile,
} from "./index";

chai.use(chaiAsPromised);

const TEST_DIR = "./testDir/";
export default function () {
  describe(`Directories`, function () {
    this.beforeEach(function () {
      //apaga
      if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, {recursive: true});
      }
      //cria zerado
      fs.mkdirSync(TEST_DIR);
    });
    this.afterAll(function () {
      //apaga
      if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, {recursive: true});
      }
    });

    it(`# should create directory`, async function () {
      expect(await mkdir(`${TEST_DIR}newDir`)).to.eql(`${TEST_DIR}newDir`);
      expect(fs.existsSync(`${TEST_DIR}newDir`)).to.be.true;
    });
    it(`# should remove directory`, async function () {
      await rmdir(`${TEST_DIR}`);
      expect(fs.existsSync(`${TEST_DIR}`)).to.be.false;
    });
    it(`# should list directory's children`, async function () {
      await fsPromises.writeFile(`${TEST_DIR}newFile.txt`, "test");
      const children = await listDirFiles(`${TEST_DIR}`);
      expect(children).to.be.an("array").of.length(1);
      expect(children[0]).to.eql(`newFile.txt`);
    });
    it(`# should identify directory's read access`, async function () {
      expect(await canRead(TEST_DIR)).to.be.true;
    });
    it(`# should identify directory's write access`, async function () {
      expect(await canWrite(TEST_DIR)).to.be.true;
    });
    it(`# should resolve relative paths`, async function () {
      expect(await resolvePath(`../nodejs-ts/src/services/files`)).to.eq(
        __dirname
      );
    });
  });
  describe(`Files`, function () {
    this.beforeEach(function () {
      //apaga
      if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, {recursive: true});
      }
      //cria zerado
      fs.mkdirSync(TEST_DIR);
    });
    this.afterAll(function () {
      //apaga
      if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, {recursive: true});
      }
    });

    it(`# should create file with read and write access`, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "should create file");
      expect(fs.existsSync(FILE)).to.be.true;
      expect(fs.readFileSync(FILE).toString()).to.eql("should create file");
      expect(await canRead(FILE)).to.be.true;
      expect(await canWrite(FILE)).to.be.true;
    });
    it(`# should read file `, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "should create file");
      expect(await readFile(FILE)).to.eql("should create file");
    });
    it(`# should append file `, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "should create file");
      await appendFile(FILE, "\nshould append file");
      expect(await readFile(FILE)).to.eql(
        "should create file\nshould append file"
      );
    });
    it(`# should rename file `, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "should create file");
      await renameFile(FILE, `${TEST_DIR}newestFile.txt`);
      expect(fs.existsSync(FILE)).to.be.false;
      expect(fs.existsSync(`${TEST_DIR}newestFile.txt`)).to.be.true;
    });
    it(`# should delete file `, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "should create file");
      await deleteFile(FILE);
      expect(fs.existsSync(FILE)).to.be.false;
    });
    it(`# should get file's Stat `, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "should create file");
      const info = await stats(FILE);
      expect(info.size).to.eq(18);
    });
    /**
     * Em resumo: quando a flag é acompanhada de "+", significa que o arquivo será aberto para ESCRITA e LEITURA;
     * quando estiver acompanhada de "x", significa que, se o arquivo já existir, lançará exceção
     */
    it(`# should create file and append data when file does NOT exist and flag 'a' (not readable)`, async function () {
      const CONTENT =
        "should create file and append data when file does NOT exist and flag 'a'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await openFile(FILE, CONTENT, "a");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should open file and append data when file EXISTS and flag 'a' (not readable)`, async function () {
      const CONTENT =
        "should open file and append data when file EXISTS and flag 'a'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "");
      await openFile(FILE, CONTENT, "a");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should create file and append data when file does NOT exist and flag 'ax' (not readable)`, async function () {
      const CONTENT =
        "should create file and append data when file does NOT exist and flag 'ax'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await openFile(FILE, CONTENT, "ax");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should throw exception when file EXISTS and flag 'ax'`, async function () {
      const CONTENT = "should throw exception when file EXISTS and flag 'ax'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "");
      await expect(openFile(FILE, CONTENT, "ax")).to.be.rejectedWith(
        "EEXIST: file already exists, open './testDir/newFile.txt'"
      );
    });
    it(`# should create file and append data when file does NOT exist and flag 'a+' (readable)`, async function () {
      const CONTENT =
        "should create file and append data when file does NOT exist and flag 'a+'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await openFile(FILE, CONTENT, "a+");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should open file and append data when file EXISTS and flag 'a+' (readable)`, async function () {
      const CONTENT =
        "should open file and append data when file EXISTS and flag 'a+'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "");
      await openFile(FILE, CONTENT, "a+");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should create file and append data when file does NOT exist and flag 'ax+' (readable)`, async function () {
      const CONTENT =
        "should create file and append data when file does NOT exist and flag 'ax+'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await openFile(FILE, CONTENT, "ax+");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should throw exception when file EXISTS and flag 'ax+'`, async function () {
      const CONTENT = "should throw exception when file EXISTS and flag 'ax+'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "");
      await expect(openFile(FILE, CONTENT, "ax+")).to.be.rejectedWith(
        "EEXIST: file already exists, open './testDir/newFile.txt'"
      );
    });
    it(`# should read file when file exists and flag 'r'`, async function () {
      const CONTENT = "should read file when file exists and flag 'r'";
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, CONTENT);
      const content: Buffer = (await openFile(FILE, "", "r")) as Buffer;
      expect(content.toString()).to.eql(CONTENT);
    });
    it(`# should throw exception when file does NOT exist and flag 'r'`, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await expect(openFile(FILE, "", "r")).to.be.rejectedWith(
        "ENOENT: no such file or directory, open './testDir/newFile.txt'"
      );
    });
    it(`# should read file when file exists and flag 'r+' (writeable)`, async function () {
      const CONTENT =
        "should read file when file exists and flag 'r+' (writeable)";
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, CONTENT);
      const content: Buffer = (await openFile(FILE, "", "r+")) as Buffer;
      expect(content.toString()).to.eql(CONTENT);
    });
    it(`# should throw exception when file does NOT exist and flag 'r+'`, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await expect(openFile(FILE, "", "r+")).to.be.rejectedWith(
        "ENOENT: no such file or directory, open './testDir/newFile.txt'"
      );
    });
    it(`# should create file with data when file does NOT exist and flag 'w' (not readable)`, async function () {
      const CONTENT =
        "should create file with data when file does NOT exist and flag 'w' (not readable)";
      const FILE = `${TEST_DIR}newFile.txt`;
      await openFile(FILE, CONTENT, "w");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should open file and overwrite data when file exists and flag 'w' (not readable)`, async function () {
      const CONTENT =
        "should open file and overwrite data when file exists and flag 'w' (not readable)";
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "previous content");
      await openFile(FILE, CONTENT, "w");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should create file with data when file does NOT exist and flag 'w+' (readable)`, async function () {
      const CONTENT =
        "should create file with data when file does NOT exist and flag 'w+' (readable)";
      const FILE = `${TEST_DIR}newFile.txt`;
      await openFile(FILE, CONTENT, "w+");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should open file and overwrite data when file exists and flag 'w+' (readable)`, async function () {
      const CONTENT =
        "should open file and overwrite data when file exists and flag 'w+' (readable)";
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "previous content");
      await openFile(FILE, CONTENT, "w+");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should create file with data when file does NOT exist and flag 'wx' (not readable)`, async function () {
      const CONTENT =
        "should create file with data when file does NOT exist and flag 'wx' (not readable)";
      const FILE = `${TEST_DIR}newFile.txt`;
      await openFile(FILE, CONTENT, "wx");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should throw exception when file already exists and flag 'wx'`, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "previous content");
      await expect(openFile(FILE, "", "wx")).to.be.rejectedWith(
        "EEXIST: file already exists, open './testDir/newFile.txt'"
      );
    });
    it(`# should create file with data when file does NOT exist and flag 'wx+' (readable)`, async function () {
      const CONTENT =
        "should create file with data when file does NOT exist and flag 'wx+' (readable)";
      const FILE = `${TEST_DIR}newFile.txt`;
      await openFile(FILE, CONTENT, "wx+");
      expect(await readFile(FILE)).to.eql(CONTENT);
    });
    it(`# should throw exception when file already exists and flag 'wx+'`, async function () {
      const FILE = `${TEST_DIR}newFile.txt`;
      await createFile(FILE, "previous content");
      await expect(openFile(FILE, "", "wx+")).to.be.rejectedWith(
        "EEXIST: file already exists, open './testDir/newFile.txt'"
      );
    });
  });
}
