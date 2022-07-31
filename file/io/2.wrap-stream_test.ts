import { writableStreamFromWriter } from "$std/streams/conversion.ts";
import { readableStreamFromReader } from "$std/streams/conversion.ts";
/**
 * wrap file(reader/writer) to stream writableStream/readStream
 */

Deno.test('writableStream', async () => {
  /**
   * Receiving a file
   */
  const fileResponse = await fetch("https://deno.land/logo.svg");

  if (fileResponse.body) {
    const file = await Deno.open("./logo.svg", { write: true, create: true });
    const writableStream = writableStreamFromWriter(file);
    await fileResponse.body.pipeTo(writableStream);
  }

});


/**
 * Sending a file
 */
Deno.test('readStream', async () => {
  const file = await Deno.open("./logo.svg", { read: true });
  const readableStream = readableStreamFromReader(file);
  await fetch("https://example.com/", {
    method: "POST",
    body: readableStream,
  });
});


/**
 * merge read stream
 * http://localhost:8000/docs/examples/subprocess
 */
import { mergeReadableStreams } from "$std/streams/merge.ts";
Deno.test('merge readStream', async () => {
  // create the file to attach the process to
  const file = await Deno.open("./process_output.txt", {
    read: true,
    write: true,
    create: true,
  });
  const fileWriter = await writableStreamFromWriter(file);

  // start the process
  const process = Deno.run({
    cmd: ["yes"],
    stdout: "piped",
    stderr: "piped",
  });

  // example of combining stdout and stderr while sending to a file
  const stdout = readableStreamFromReader(process.stdout);
  const stderr = readableStreamFromReader(process.stderr);
  const joined = mergeReadableStreams(stdout, stderr);
  // returns a promise that resolves when the process is killed/closed
  joined.pipeTo(fileWriter).then(() => console.log("pipe join done"));

  // manually stop process "yes" will never end on its own
  setTimeout(() => {
    process.kill("SIGINT");
  }, 100);
});