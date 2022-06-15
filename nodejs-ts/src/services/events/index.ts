import EventEmitter from "events";

/**
 * Create a EventEmitter and expects {delay} milliseconds for emit the event {eventName}.
 * Unless {delay} is bellow zero. In this case, there is no emit call
 *
 * @param eventName Name of event to be emmitted afeter {delay} milliseconds
 * @param delay Delay before the event be emmitted
 * @returns EventEmitter instance
 */
export function createEmitter(eventName: string, delay = 500): EventEmitter {
  const emitter = new EventEmitter();
  if (delay >= 0) {
    setTimeout(function () {
      emitter.emit(eventName);
    }, delay);
  }
  return emitter;
}

export function getEventNames(emitter: EventEmitter) {
  return emitter.eventNames();
}

export function triggerEvent(
  emitter: EventEmitter,
  eventName: string,
  param: any
) {
  emitter.emit(eventName, param);
}

export function turnOffEvent(
  emitter: EventEmitter,
  eventName: string,
  listener: (...args: any[]) => void
) {
  emitter.off(eventName, listener);
}
