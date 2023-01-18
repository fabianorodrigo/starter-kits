import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import {connectLocalRedis, setComposedKey, setSingleKey} from "./index";

chai.use(chaiAsPromised);

export default function () {
  it(`# should instance client and connect to Redis`, async function () {
    const client = await connectLocalRedis();
    expect(client).to.be.not.null;
    expect(client).to.be.not.undefined;
    expect(client).to.be.an("object");
    expect(client.isOpen).to.be.true;
    expect(await client.aclWhoAmI()).to.eq("default");
    await client.disconnect();
    expect(client.isOpen).to.be.false;
  });

  it(`# should set key/single value on Redis`, async function () {
    let client = null;
    try {
      client = await connectLocalRedis();
      await setSingleKey(client, "testKeyString", "testeValue");
      expect(await client.get("testKeyString")).to.eq("testeValue");
    } finally {
      if (client && client.isOpen) {
        await client.disconnect();
      }
    }
  });

  it(`# should set key/composed value on Redis`, async function () {
    const TESLA = {
      name: "Nicola",
      surname: "Tesla",
      age: "42",
    };
    let client = null;
    try {
      client = await connectLocalRedis();
      await setComposedKey(client, "testKeyObject", TESLA);
      // o ".to.eql" compara os atributos em si. O ".to.eq" compara a referência
      expect(await client.hGetAll("testKeyObject")).to.eql(TESLA);
    } finally {
      if (client && client.isOpen) {
        await client.disconnect();
      }
    }
  });
}
