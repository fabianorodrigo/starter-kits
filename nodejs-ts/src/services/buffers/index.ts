export function createFromString(
  text: string,
  encoding: BufferEncoding = "utf-8"
) {
  return Buffer.from(text, encoding);
}
export function createFromArray(array: ReadonlyArray<number>) {
  return Buffer.from(array);
}
export function getLength(buffer: Buffer) {
  return buffer.length;
}
export function readFrom(buffer: Buffer, encoding: BufferEncoding = "utf-8") {
  return buffer.toString(encoding);
}

export function writeTo(
  buffer: Buffer,
  text: string,
  encoding: BufferEncoding = "utf-8"
) {
  return buffer.write(text, encoding);
}

export function copyInto(
  bufferSource: Buffer,
  bufferTarget: Buffer,
  offset = 0
) {
  const r = bufferSource.copy(bufferTarget, offset);
  return r;
}
