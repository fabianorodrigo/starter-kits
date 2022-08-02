import { Listener } from '@ethersproject/abstract-provider';

export interface EventMonitoringParameters {
  // name of the event to be monitored
  eventName: string;
  // listener
  listenerFunction: Listener;
  //optional filters of events
  args?: any[];
}
