// input stream
  const input = "hello world";
  const raw = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(input));
      controller.close();
    },
  });

  // pipe
  const proc = Deno.run({
    cmd: ["grep",'-n','-o','hello'],
    stdin: "piped",
    stdout: "piped",
    stderr: "null",
  });


  // pipe in
  await raw.pipeTo(proc.stdin.writable);
  // pipe out
  const out = await proc.output();
  const status = await proc.status();
  console.log({
      out,
      outstr: new TextDecoder().decode(out),
      status,
  })
