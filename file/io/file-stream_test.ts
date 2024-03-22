Deno.test('readFileStream', async () => {
  const localUrl = "a.txt";
  const file = await Deno.open(localUrl);
  // headers.set("content-length", String((await file.stat()).size));
  const _ = file.readable;
});

Deno.test('writeFileStream', async () => {
  const localUrl = "./tmp/a.log";
  const file = await Deno.open(localUrl, { write: true });
  const _ = file.writable;
  file.close();
});
