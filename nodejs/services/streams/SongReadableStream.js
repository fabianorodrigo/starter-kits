const Stream = require("stream");

const SongReadableStream = new Stream.Readable({
  read() {},
});
SongReadableStream.path = __filename;
//The 'readable' event is emitted when there is data available to be read from the stream or when the end of the stream has been reached.
SongReadableStream.on("readable", () => {
  console.log(
    "SongReadableStream.readable",
    SongReadableStream.read().toString()
  );
});
SongReadableStream.on("data", (chunk) => {
  console.log("SongReadableStream.data", chunk.toString());
});
SongReadableStream.on("end", () => {
  console.log("SongReadableStream.data", "Reached end of stream.");
});

const songParts = [
  "Olha que coisa mais linda, mais cheia de graça",
  "É ela, menina, que vem e que passa",
  "Num doce balanço a caminho do mar",
];

const interval = setInterval(() => {
  if (songParts.length === 0) {
    SongReadableStream.destroy();
    clearInterval(interval);
  } else {
    //take first element from array (like "pop", but from beggining)
    const p = songParts.shift();
    SongReadableStream.push(p);
  }
}, 500);

module.exports = SongReadableStream;
