const EventEmitter = require("events");

module.exports = {
  createEmitter: function (eventName) {
    const emitter = new EventEmitter();
    setTimeout(function () {
      emitter.emit(eventName);
    }, 500);
    return emitter;
  },
  getEventNames: function (emitter) {
    return emitter.eventNames();
  },
  triggerEvent: function (emitter, eventName, param) {
    emitter.emit(eventName, param);
  },
  turnOffEvent: function (emitter, eventName, listener) {
    emitter.off(eventName, listener);
  },
};
