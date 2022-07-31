/**
 * proc.stdin is Reader
 * proc.stdin.writable is WritableStream
 */
// input stream
const input = "hello world";
const readStream = new ReadableStream({
  start(controller) {
    controller.enqueue(new TextEncoder().encode(input));
    controller.close();
  },
});

// pipe
const proc = Deno.run({
  cmd: ["grep", '-n', '-o', 'hello'],
  stdin: "piped",
  stdout: "piped",
  stderr: "null",
});


// pipe to stdin
await readStream.pipeTo(proc.stdin.writable);
// pipe out
const out = await proc.output();
const status = await proc.status();
console.log({
  out,
  outstr: new TextDecoder().decode(out),
  status,
});
