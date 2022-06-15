import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  createEmitter,
  getEventNames,
  triggerEvent,
  turnOffEvent,
} from "./index";

chai.use(chaiAsPromised);

export default function () {
  it(`# should create Emitter`, async function () {
    const ee = createEmitter("test", 0);
    expect(ee).to.not.be.null;
    expect(ee).to.not.be.undefined;
  });

  it(`# should return Emitter's events names: zero before "ON" and one after`, async function () {
    const ee = createEmitter("test", 0);
    expect(getEventNames(ee)).to.be.an("array").length(0);
    ee.on("test", () => {
      return true;
    });
    expect(getEventNames(ee)).to.be.an("array").length(1);
  });

  it(`# should trigger Event on Emitter`, function (done: Mocha.Done) {
    let fired = false;
    const ee = createEmitter("test", -1);
    ee.on("test", () => {
      fired = true;
    });
    triggerEvent(ee, "test", "should trigger event");
    setTimeout(() => {
      expect(fired).to.be.true;
      done();
    }, 300);
  });

  it(`# should turn off Event on Emitter`, function (done: Mocha.Done) {
    let countIntervals = 3;
    const expectedValues = ["some", "stopped"];
    let fired = "false";
    const ee = createEmitter("test", -1);

    function listenerFunction(value: string) {
      fired = expectedValues.shift();
    }
    ee.on("test", listenerFunction);

    const interval = setInterval(() => {
      triggerEvent(ee, "test", expectedValues[0]);
      // the first is obvously equal the first elevent of {expectedValues},
      // but if the turnOffEvent is working, all of them will be
      expect(fired).to.eq("some");
      // the first time executed, count is 3, then turnoff event
      if (countIntervals == 3) {
        turnOffEvent(ee, "test", listenerFunction);
      }

      if (countIntervals <= 0) {
        clearInterval(interval);
        done();
      }
      countIntervals--;
    }, 100);
  });
}
