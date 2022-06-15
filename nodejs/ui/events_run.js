const colors = require("colors");
const ui = require("./main");
const Events = require("../services/events");

const emitter = Events.createEmitter(`learning-events`);
emitter.on(`learning-events`, function () {
  console.log(`learning-events happened! ${new Date()}`.yellow);
});
emitter.on(`outro`, logAll);
emitter.on(`outro`, logUntil3);
emitter.once(`outro`, logOnce);
let count = 0;
setInterval(() => {
  count++;
  Events.triggerEvent(emitter, `outro`, count);
}, 1000);

console.log(Events.getEventNames(emitter));

function logAll(c) {
  console.log(`outro! ${new Date()}: ${c}`.yellow);
}
function logUntil3(c) {
  console.log(`Logará até a terceira! ${new Date()}: ${c}`.magenta);
  if (c >= 3) {
    Events.turnOffEvent(emitter, `outro`, logUntil3);
  }
}
function logOnce(c) {
  console.log(`Com emitter.once, é só uma vez! ${new Date()}: ${c}`.green);
}
