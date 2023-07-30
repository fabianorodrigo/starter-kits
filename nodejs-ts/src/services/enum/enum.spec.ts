import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {isUF} from './index';

chai.use(chaiAsPromised);

export default function () {
  it(`# should return TRUE if uf string exists in enum`, async function () {
    expect(isUF('MG')).to.be.true;
  });
  it(`# should return  FALSE if uf string does not exist in enum`, async function () {
    expect(isUF('ZZ')).to.be.false;
  });
  it(`# should return  TRUE if number is up to the length of itens in enum less one`, async function () {
    expect(isUF(12)).to.be.true;
  });
  it(`# should return  FALSE if number is equal to length of itens in enum or higher`, async function () {
    expect(isUF(13)).to.be.false;
  });
}
