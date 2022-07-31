import { readerFromStreamReader, readAll } from "$std/streams/conversion.ts";
import { TextLineStream } from '$std/streams/delimiter.ts';
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
// readStreamString(Deno.stdin.readable)
export async function readStreamString(inputStream: ReadableStream) {
  const r = readerFromStreamReader(inputStream.getReader());
  const bytes = await readAll(r);
  return (new TextDecoder().decode(bytes));
}

export async function readStreamLines(inputStream: ReadableStream) {
  // Deno.stdin.readable
  const lines = inputStream
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());
  for await (const line of lines) {
    console.log(line);
  }
}
