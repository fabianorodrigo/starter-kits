import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  eraseIthItem,
  insertAs1stPosition,
  insertAsIthPosition,
  removeAndInsertIthItem,
  removeFirstItem,
  removeIthItem,
  removeLastItem,
  sort,
  sortByProperty,
  sortNumbers,
} from "./index";

chai.use(chaiAsPromised);

export default function () {
  describe(`Sorting`, function () {
    let arrayNumbers: number[];
    let arrayStrings: string[];
    let arrayObjects: {name: string; date: Date}[];
    let ARRAY_NUMBERS_LENGTH: number;

    this.beforeEach(function () {
      arrayNumbers = [1991, 1977, 2008, 1986, 2007, 2006];
      arrayStrings = ["Flamengo", "Catete", "Botafogo", "Curicica"];
      arrayObjects = [
        {name: "Brasileiro", date: new Date(1978, 3, 5)},
        {name: "Mundial", date: new Date(1992, 12, 13)},
        {name: "Paulista", date: new Date(1943, 1, 1)},
      ];
      ARRAY_NUMBERS_LENGTH = arrayNumbers.length;
    });

    it(`# should sort ASC string arrays`, async function () {
      const r = sort(arrayStrings);
      expect(r.join(",")).to.eql("Botafogo,Catete,Curicica,Flamengo");
    });
    it(`# should sort DEC string arrays`, async function () {
      const r = sort(arrayStrings, true);
      expect(r.join(",")).to.eql("Flamengo,Curicica,Catete,Botafogo");
    });
    it(`# should sort ASC numbers arrays`, async function () {
      const r = sortNumbers(arrayNumbers);
      expect(r.join(",")).to.eql("1977,1986,1991,2006,2007,2008");
    });
    it(`# should sort DEC numbers arrays`, async function () {
      const r = sortNumbers(arrayNumbers, true);
      expect(r.join(",")).to.eql("2008,2007,2006,1991,1986,1977");
    });

    it(`# should sort ASC object arrays`, async function () {
      const r = sortByProperty(arrayObjects, "date");
      expect(r[0].name).to.eql("Paulista");
      expect(r[1].name).to.eql("Brasileiro");
      expect(r[2].name).to.eql("Mundial");
    });
    it(`# should sort DEC object arrays`, async function () {
      const r = sortByProperty(arrayObjects, "date", true);
      expect(r[2].name).to.eql("Paulista");
      expect(r[1].name).to.eql("Brasileiro");
      expect(r[0].name).to.eql("Mundial");
    });
    it(`# should be unsorted`, async function () {
      expect(arrayNumbers[0]).to.eql(1991);
    });
  });

  describe(`Updating`, function () {
    let arrayNumbers: number[];
    let arrayStrings: string[];
    let arrayObjects: {name: string; date: Date}[];
    let ARRAY_NUMBERS_LENGTH: number;

    this.beforeEach(function () {
      arrayNumbers = [1991, 1977, 2008, 1986, 2007, 2006];
      arrayStrings = ["Flamengo", "Catete", "Botafogo", "Curicica"];
      arrayObjects = [
        {name: "Brasileiro", date: new Date(1978, 3, 5)},
        {name: "Mundial", date: new Date(1992, 12, 13)},
        {name: "Paulista", date: new Date(1943, 1, 1)},
      ];
      ARRAY_NUMBERS_LENGTH = arrayNumbers.length;
    });

    it(`# should remove last item and return removed item`, async function () {
      const r = removeLastItem(arrayNumbers);
      expect(r).to.eql(2006); //returns removed
      expect(arrayNumbers[arrayNumbers.length - 1]).to.eql(2007);
    });
    it(`# should remove first item and return removed item`, async function () {
      const r = removeFirstItem(arrayNumbers);
      expect(r).to.eql(1991); //returns removed
      expect(arrayNumbers[0]).to.eql(1977);
    });
    it(`# should insert as first item and return new length`, async function () {
      const r = insertAs1stPosition(arrayNumbers, 2022);
      expect(r).to.eql(ARRAY_NUMBERS_LENGTH + 1); //returns new length
      expect(arrayNumbers[0]).to.eql(2022);
    });
    it(`# should insert item at Ith position and return new length`, async function () {
      const r = insertAsIthPosition(arrayNumbers, 2, 2022);
      expect(r).to.eql(ARRAY_NUMBERS_LENGTH + 1); //returns new length
      expect(arrayNumbers[2]).to.eql(2022);
    });
    it(`# should erase item at Ith position and keep same length`, async function () {
      const r = eraseIthItem(arrayNumbers, 2);
      expect(arrayNumbers.length).to.eql(ARRAY_NUMBERS_LENGTH); //keeps length
      expect(arrayNumbers[2]).to.be.undefined;
    });
    it(`# should remove item at Ith position and return the removed item`, async function () {
      const r = removeIthItem(arrayNumbers, 2);
      expect(r).to.be.an("array").that.have.length(1);
      expect(r[0]).to.be.eq(2008);
      expect(arrayNumbers.length).to.eql(ARRAY_NUMBERS_LENGTH - 1); //resizes array
      expect(arrayNumbers[2]).to.eql(1986);
    });
    it(`# should remove item at Ith position, insert new ones and return the removed itens`, async function () {
      const r = removeAndInsertIthItem(arrayNumbers, 2, 3, 2021, 2023);
      expect(r).to.be.an("array").that.have.length(3);
      expect(r[0]).to.be.eq(2008);
      expect(r[1]).to.be.eq(1986);
      expect(r[2]).to.be.eq(2007);
      expect(arrayNumbers.length).to.eql(ARRAY_NUMBERS_LENGTH - 1); //resizes array (minus 3, plus 2)
      expect(arrayNumbers[2]).to.eql(2021);
    });
  });
}
