Streams
===
Streams are objects that let you read data from a source or write data to a destination in continuous fashion. Streams are not a concept unique to Node.js. They were introduced in the Unix operating system decades ago, and programs can interact with each other passing streams through the pipe operator (`|`). Using streams you read it piece by piece, processing its content without keeping it all in memory.

Streams basically provide two major advantages over using other data handling methods:

- Memory efficiency: you don't need to load large amounts of data in memory before you are able to process it
- Time efficiency: it takes way less time to start processing data, since you can start processing as soon as you have it, rather than waiting till the whole data payload is available

There are many stream objects provided by Node.js. For instance, a request to an HTTP server and process.stdout are both stream instances.

There are four types of streams: 

- Readable - Stream which is used for read operation.
- Writable - Stream which is used for write operation.
- Duplex - Stream which can be used for both read and write operation.
- Transform - A type of duplex stream where the output is computed based on input.

All streams created by Node.js APIs operate exclusively on strings and Buffer (or Uint8Array) objects. It is possible, however, for stream implementations to work with other types of JavaScript values (with the exception of null, which serves a special purpose within streams).

All streams are instance of EventEmitter and throws several events at different instance of times. For example, some of the commonly used events are:

- data - This event is fired when there is data is available to read.
- end - This event is fired when there is no more data to read.
- error - This event is fired when there is any error receiving or writing data.
- finish - This event is fired when all the data has been flushed to underlying system.

The `stream/promises` API provides an alternative set of asynchronous utility functions for streams that return `Promise` objects rather than using callbacks.