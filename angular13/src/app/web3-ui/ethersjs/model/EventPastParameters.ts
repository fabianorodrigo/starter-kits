export interface EventPastParameters {
  // name of the event to be monitored
  eventName: string;
  //optional filters of events
  args?: any[];
  fromBlock?: number | string;
  toBlock?: number | string;
}
