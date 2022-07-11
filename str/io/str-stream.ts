import { readerFromStreamReader, readAll } from "$std/streams/conversion.ts";
export { readAll } from "$std/streams/conversion.ts";

/**
 * wrap str to stream 
 */
// create stream
export function createStream(input: string) {
  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(input));
      controller.close();
    },
  });
  return inputStream;
}

// read stream
export async function readStreamString(inputStream: ReadableStream) {
  const r = readerFromStreamReader(inputStream.getReader());
  const bytes = await readAll(r);
  return (new TextDecoder().decode(bytes));
}