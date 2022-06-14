const colors = require("colors");
const ui = require("./main");
const Events = require("../services/events");

const emitter = Events.createEmitter(`learning-events`);
emitter.on(`learning-events`, function () {
  console.log(`learning-events happened! ${new Date()}`.yellow);
});
emitter.on(`outro`, function () {
  console.log(`outro! ${new Date()}`.yellow);
});
Events.triggerEvent(emitter, `outro`);
