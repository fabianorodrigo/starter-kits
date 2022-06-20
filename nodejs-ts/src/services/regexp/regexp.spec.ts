import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  getIndexFistA,
  replaceSpaces,
  replaceFirstA,
  containNumbers,
  findNumericCharacters,
  findNumbers,
  replaceDynamically,
  matchNumbers,
} from "./index";

chai.use(chaiAsPromised);

export default function () {
  let TEXT = "";
  const A_TEXT = `The angry birds' parents`;
  const ALESS_TEXT = "We dont see it";

  describe(`Testing/Searching`, function () {
    this.beforeEach(function () {
      TEXT = `Continuous attention to technical excellence and good design enhances agility.`;
    });

    it(`# should find the first character 'A' or 'a' when it exists`, async function () {
      expect(getIndexFistA(TEXT)).to.eql(11);
      expect(getIndexFistA(TEXT.replace("a", "A"))).to.eql(11);
    });
    it(`# should not find the first character 'A' or 'a' when it DOES NOT exist`, async function () {
      expect(getIndexFistA(ALESS_TEXT)).to.eql(-1);
    });
    it(`# should detect if a text has numbers or not`, async function () {
      expect(containNumbers(TEXT)).to.eql(false);
      expect(containNumbers(`I want 2 coffes`)).to.eql(true);
    });
    it(`# should take each numeric character occurrence separately in a text when they exist`, async function () {
      // NO numbers
      const rNoNumbers = findNumericCharacters(TEXT);
      expect(rNoNumbers).to.be.an("array").that.have.length(0);
      // With numbers
      const r = findNumericCharacters(`I want 20 coffes of 100ml`);
      expect(r).to.be.an("array").that.have.length(5);
      expect(r[0][0]).to.eql("2");
      expect(r[1][0]).to.eql("0");
      expect(r[2][0]).to.eql("1");
      expect(r[3][0]).to.eql("0");
      expect(r[4][0]).to.eql("0");
    });
    it(`# should take the numbers in a text when they exist (Regex.exec)`, async function () {
      // NO numbers
      const rNoNumbers = findNumbers(TEXT);
      expect(rNoNumbers).to.be.an("array").that.have.length(0);
      // With numbers
      const r = findNumbers(`I want 20 coffes of 100ml`);
      expect(r).to.be.an("array").that.have.length(2);
      expect(r[0][0]).to.eql("20");
      expect(r[1][0]).to.eql("100");
    });
    it(`# should match the numbers in a text when they exist (String.match)`, async function () {
      // NO numbers
      const rNoNumbers = matchNumbers(TEXT);
      expect(rNoNumbers).to.be.null;
      // With numbers
      const r = matchNumbers(`I want 20 coffes of 100ml`);
      expect(r).to.be.an("array").that.have.length(2);
      expect(r[0]).to.eql("20");
      expect(r[1]).to.eql("100");
    });
  });
  describe(`Replacement`, function () {
    it(`# should replace only the first character 'A' or 'a' when it exists`, async function () {
      expect(replaceFirstA(A_TEXT, "T")).to.eql(`The Tngry birds' parents`);
    });
    it(`# should not replace 'A' or 'a' when it  DOES NOT exist`, async function () {
      const text = `We dont see it`;
      expect(replaceFirstA(ALESS_TEXT, "T")).to.eql(ALESS_TEXT);
    });
    it(`# should replace all spaces when it exists`, async function () {
      expect(replaceSpaces("Test it well", "_")).to.eql(`Test_it_well`);
    });
    it(`# should not replace all spaces when they DON'T exist`, async function () {
      expect(replaceSpaces("TestItWell", "_")).to.eql(`TestItWell`);
    });
    it(`# should replace strings with dynamic regular expressions`, async function () {
      expect(replaceDynamically(TEXT, "and good", "and awesome")).to.eql(
        `Continuous attention to technical excellence and awesome design enhances agility.`
      );
      const TX = `This ^ is $ a confus)ng text. [ok?]`;
      expect(replaceDynamically(TX, "^", "")).to.eql(
        `This  is $ a confus)ng text. [ok?]`
      );
      expect(replaceDynamically(TX, "$", "")).to.eql(
        `This ^ is  a confus)ng text. [ok?]`
      );

      expect(replaceDynamically(TX, ")", "")).to.eql(
        `This ^ is $ a confusng text. [ok?]`
      );

      expect(replaceDynamically(TX, "[", "")).to.eql(
        `This ^ is $ a confus)ng text. ok?]`
      );
      expect(replaceDynamically(TX, "]", "")).to.eql(
        `This ^ is $ a confus)ng text. [ok?`
      );
      expect(replaceDynamically(TX, "?", "")).to.eql(
        `This ^ is $ a confus)ng text. [ok]`
      );
      expect(replaceDynamically(TX, ".", "")).to.eql(
        `This ^ is $ a confus)ng text [ok?]`
      );
    });
  });
}
