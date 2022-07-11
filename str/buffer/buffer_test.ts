import { str2bytes } from './bytestr.ts';
import { readAll } from '$std/streams/conversion.ts';
import { Buffer } from '$std/io/buffer.ts';

// reader type:
//  *
//  * ```ts
//  * import { Buffer } from "../io/buffer.ts";
//  * import { readAll } from "./conversion.ts";
//  *
//  * // Example from stdin
//  * const stdinContent = await readAll(Deno.stdin);
//  *
//  * // Example from file
//  * const file = await Deno.open("my_file.txt", {read: true});
//  * const myFileContent = await readAll(file);
//  * Deno.close(file.rid);
//  *
//  * // Example from buffer
//  * const myData = new Uint8Array(100);
//  * // ... fill myData array with data
//  * const reader = new Buffer(myData.buffer);
//  * const bufferContent = await readAll(reader);

Deno.test("buffer is writer/reader", async (t) => {
  // init via construct
  const bytes = str2bytes("12");
  const buffer = new Buffer(bytes);

  // buffer is writer/reader
  buffer.write(bytes);

  // buffer is reader
  console.log(await readAll(buffer));
});
